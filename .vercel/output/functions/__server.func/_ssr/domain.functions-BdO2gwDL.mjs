import { n as createServerFn } from "./server-kAi7qpat.mjs";
import { a as stringType, i as objectType, r as numberType, t as arrayType } from "../_libs/zod.mjs";
import { i as consumeRentalCreditForToken } from "./pass.functions-Ctaj05cW.mjs";
import { o as PRODUCTS } from "./products-Bl5euSZz.mjs";
import { t as createServerRpc } from "./createServerRpc-C1PBKIgS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/domain.functions-BdO2gwDL.js
var ItemInput = objectType({
	productId: stringType().min(1),
	slug: stringType().min(1),
	size: stringType().min(1),
	start: stringType().date(),
	end: stringType().date()
});
var SessionInput = objectType({ accessToken: stringType().min(20) });
function getSupabase(accessToken) {
	const url = process.env["SUPABASE_URL"];
	const key = process.env["SUPABASE_ANON_KEY"];
	if (!url || !key) throw new Error("Persistence service is not configured.");
	return import("../_libs/@supabase/ssr+[...].mjs").then((n) => n.n).then(({ createClient }) => createClient(url, key, { global: { headers: { Authorization: `Bearer ${accessToken}` } } }));
}
async function requireUser(accessToken) {
	const client = await getSupabase(accessToken);
	const { data, error } = await client.auth.getUser(accessToken);
	if (error || !data.user) throw new Error("Authentication required.");
	return {
		client,
		user: data.user
	};
}
var createSandboxOrder_createServerFn_handler = createServerRpc({
	id: "6d73d27a3b838e93b57d60670dd1db87c1ede41e81234e4e508a7ff79388c185",
	name: "createSandboxOrder",
	filename: "src/lib/domain.functions.ts"
}, (opts) => createSandboxOrder.__executeServer(opts));
var createSandboxOrder = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	...SessionInput.shape,
	items: arrayType(ItemInput).min(1).max(20)
}).parse(data)).handler(createSandboxOrder_createServerFn_handler, async ({ data }) => {
	const { client, user } = await requireUser(data.accessToken);
	const products = data.items.map((item) => {
		const product = PRODUCTS.find((candidate) => candidate.id === item.productId && candidate.slug === item.slug);
		if (!product || !product.sizes.includes(item.size) || !product.available) throw new Error("One or more rental items are unavailable.");
		const start = /* @__PURE__ */ new Date(`${item.start}T00:00:00Z`);
		const end = /* @__PURE__ */ new Date(`${item.end}T00:00:00Z`);
		const days = Math.max(1, Math.round((end.getTime() - start.getTime()) / 864e5));
		if (days > 30 || end < start) throw new Error("Rental dates are invalid.");
		return {
			item,
			product,
			days,
			start,
			end
		};
	});
	if (!(await consumeRentalCreditForToken(data.accessToken, products.length)).allowed) throw new Error("This rental requires a DRIPPASS plan. Choose a pass to start renting.");
	const rentalStart = products.reduce((date, item) => item.start < date ? item.start : date, products[0].start);
	const rentalEnd = products.reduce((date, item) => item.end > date ? item.end : date, products[0].end);
	const total = products.reduce((sum, item) => sum + item.product.perDay * item.days, 0);
	const { data: order, error } = await client.from("orders").insert({
		user_id: user.id,
		status: "upcoming",
		rental_start: rentalStart.toISOString().slice(0, 10),
		rental_end: rentalEnd.toISOString().slice(0, 10),
		total_amount: total,
		payment_mode: "sandbox"
	}).select("id").single();
	if (error || !order) throw new Error("Order could not be saved.");
	const { error: itemError } = await client.from("order_items").insert(products.map(({ item, product, days }) => ({
		order_id: order.id,
		product_id: product.id,
		product_slug: product.slug,
		product_title: product.title,
		size: item.size,
		daily_price: product.perDay,
		rental_days: days
	})));
	if (itemError) throw new Error("Order items could not be saved.");
	return {
		orderId: order.id,
		total
	};
});
var getOrderHistory_createServerFn_handler = createServerRpc({
	id: "113bc625da4d7d83f8458b5e0967905617397a05d69b90d0b6093ce9727107ee",
	name: "getOrderHistory",
	filename: "src/lib/domain.functions.ts"
}, (opts) => getOrderHistory.__executeServer(opts));
var getOrderHistory = createServerFn({ method: "POST" }).inputValidator((data) => SessionInput.parse(data)).handler(getOrderHistory_createServerFn_handler, async ({ data }) => {
	const { client, user } = await requireUser(data.accessToken);
	const { data: orders, error } = await client.from("orders").select("*, order_items(*)").eq("user_id", user.id).order("created_at", { ascending: false }).limit(20);
	if (error) throw new Error("Order history could not be loaded.");
	return { orders: orders ?? [] };
});
var joinWaitlist_createServerFn_handler = createServerRpc({
	id: "f754172c5ac62c5760a0ae49c3d794ed6566e31bad3c73ae510faecdedcf4efc",
	name: "joinWaitlist",
	filename: "src/lib/domain.functions.ts"
}, (opts) => joinWaitlist.__executeServer(opts));
var joinWaitlist = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	...SessionInput.shape,
	productId: stringType().min(1)
}).parse(data)).handler(joinWaitlist_createServerFn_handler, async ({ data }) => {
	const { client, user } = await requireUser(data.accessToken);
	const product = PRODUCTS.find((candidate) => candidate.id === data.productId);
	if (!product || product.available) throw new Error("This product is not eligible for a waitlist.");
	const { error } = await client.from("waitlist_entries").insert({
		user_id: user.id,
		product_id: product.id,
		email: user.email
	});
	if (error?.code === "23505") throw new Error("You are already on this waitlist.");
	if (error) throw new Error("Waitlist signup could not be saved.");
	return { saved: true };
});
var createReview_createServerFn_handler = createServerRpc({
	id: "5cb1a00e027dbd8f98745a9a23563d71b9b13a375249785d8b6651de49c7a3e0",
	name: "createReview",
	filename: "src/lib/domain.functions.ts"
}, (opts) => createReview.__executeServer(opts));
var createReview = createServerFn({ method: "POST" }).inputValidator((data) => objectType({
	...SessionInput.shape,
	productId: stringType().min(1),
	rating: numberType().int().min(1).max(5),
	body: stringType().trim().min(10).max(2e3)
}).parse(data)).handler(createReview_createServerFn_handler, async ({ data }) => {
	const { client, user } = await requireUser(data.accessToken);
	const { error } = await client.from("reviews").insert({
		user_id: user.id,
		product_id: data.productId,
		rating: data.rating,
		body: data.body
	});
	if (error?.code === "42501") throw new Error("Only customers with a completed rental can review this product.");
	if (error?.code === "23505") throw new Error("You have already reviewed this product.");
	if (error) throw new Error("Review could not be saved.");
	return { saved: true };
});
//#endregion
export { createReview_createServerFn_handler, createSandboxOrder_createServerFn_handler, getOrderHistory_createServerFn_handler, joinWaitlist_createServerFn_handler };
