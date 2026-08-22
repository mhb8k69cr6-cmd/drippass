import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { PRODUCTS } from "@/data/products";

const ItemInput = z.object({
  productId: z.string().min(1),
  slug: z.string().min(1),
  size: z.string().min(1),
  start: z.string().date(),
  end: z.string().date(),
});
const SessionInput = z.object({ accessToken: z.string().min(20) });

function getSupabase(accessToken: string) {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_ANON_KEY"];
  if (!url || !key) throw new Error("Persistence service is not configured.");
  return import("@supabase/supabase-js").then(({ createClient }) => createClient(url, key, { global: { headers: { Authorization: `Bearer ${accessToken}` } } }));
}

async function requireUser(accessToken: string) {
  const client = await getSupabase(accessToken);
  const { data, error } = await client.auth.getUser(accessToken);
  if (error || !data.user) throw new Error("Authentication required.");
  return { client, user: data.user };
}

export const createSandboxOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ ...SessionInput.shape, items: z.array(ItemInput).min(1).max(20) }).parse(data))
  .handler(async ({ data }) => {
    const { client, user } = await requireUser(data.accessToken);
    const products = data.items.map((item) => {
      const product = PRODUCTS.find((candidate) => candidate.id === item.productId && candidate.slug === item.slug);
      if (!product || !product.sizes.includes(item.size) || !product.available) throw new Error("One or more rental items are unavailable.");
      const start = new Date(`${item.start}T00:00:00Z`);
      const end = new Date(`${item.end}T00:00:00Z`);
      const days = Math.max(1, Math.round((end.getTime() - start.getTime()) / 86400000));
      if (days > 30 || end < start) throw new Error("Rental dates are invalid.");
      return { item, product, days, start, end };
    });
    const rentalStart = products.reduce((date, item) => item.start < date ? item.start : date, products[0]!.start);
    const rentalEnd = products.reduce((date, item) => item.end > date ? item.end : date, products[0]!.end);
    const total = products.reduce((sum, item) => sum + item.product.perDay * item.days, 0);
    const { data: order, error } = await client.from("orders").insert({ user_id: user.id, status: "upcoming", rental_start: rentalStart.toISOString().slice(0, 10), rental_end: rentalEnd.toISOString().slice(0, 10), total_amount: total, payment_mode: "sandbox" }).select("id").single();
    if (error || !order) throw new Error("Order could not be saved.");
    const { error: itemError } = await client.from("order_items").insert(products.map(({ item, product, days }) => ({ order_id: order.id, product_id: product.id, product_slug: product.slug, product_title: product.title, size: item.size, daily_price: product.perDay, rental_days: days })));
    if (itemError) throw new Error("Order items could not be saved.");
    return { orderId: order.id, total };
  });

export const getOrderHistory = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => SessionInput.parse(data))
  .handler(async ({ data }) => {
    const { client, user } = await requireUser(data.accessToken);
    const { data: orders, error } = await client.from("orders").select("*, order_items(*)").eq("user_id", user.id).order("created_at", { ascending: false }).limit(20);
    if (error) throw new Error("Order history could not be loaded.");
    return { orders: orders ?? [] };
  });

export const joinWaitlist = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ ...SessionInput.shape, productId: z.string().min(1) }).parse(data))
  .handler(async ({ data }) => {
    const { client, user } = await requireUser(data.accessToken);
    const product = PRODUCTS.find((candidate) => candidate.id === data.productId);
    if (!product || product.available) throw new Error("This product is not eligible for a waitlist.");
    const { error } = await client.from("waitlist_entries").insert({ user_id: user.id, product_id: product.id, email: user.email });
    if (error?.code === "23505") throw new Error("You are already on this waitlist.");
    if (error) throw new Error("Waitlist signup could not be saved.");
    return { saved: true };
  });

export const createReview = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ ...SessionInput.shape, productId: z.string().min(1), rating: z.number().int().min(1).max(5), body: z.string().trim().min(10).max(2000) }).parse(data))
  .handler(async ({ data }) => {
    const { client, user } = await requireUser(data.accessToken);
    const { error } = await client.from("reviews").insert({ user_id: user.id, product_id: data.productId, rating: data.rating, body: data.body });
    if (error?.code === "42501") throw new Error("Only customers with a completed rental can review this product.");
    if (error?.code === "23505") throw new Error("You have already reviewed this product.");
    if (error) throw new Error("Review could not be saved.");
    return { saved: true };
  });
