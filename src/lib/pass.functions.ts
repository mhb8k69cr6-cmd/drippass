import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type PassId = "FREE" | "SILVER" | "GOLD" | "VIP";
export type PassStatus = "ACTIVE" | "CANCELLED" | "EXPIRED" | "PAST_DUE";
export type PassState = {
  planId: PassId;
  status: PassStatus;
  aiTryOnUses: number;
  aiStylistUses: number;
  rentalCredits: number;
  unlimitedSwaps: boolean;
  vipInventoryAccess: boolean;
  aiTryOnMonthlyLimit: number;
  rentalDuration: string;
  delivery: string;
  priorityDelivery: boolean;
  earlyDropAccess: boolean;
  humanStylist: boolean;
};

export function canUseAiTryOn(pass: PassState) {
  return pass.aiTryOnUses < 0 || pass.aiTryOnUses > 0;
}

export function canUseAiStylist(pass: PassState) {
  return pass.aiStylistUses < 0 || pass.aiStylistUses > 0;
}

export function canRent(pass: PassState) {
  return pass.unlimitedSwaps || pass.rentalCredits > 0;
}

export function getRentalCredits(pass: PassState) {
  return pass.rentalCredits;
}

export function getAiTryOnRemaining(pass: PassState) {
  return pass.aiTryOnUses;
}

export function getAiStylistRemaining(pass: PassState) {
  return pass.aiStylistUses;
}

export function canAccessVipInventory(pass: PassState) {
  return pass.vipInventoryAccess;
}

export function hasUnlimitedSwaps(pass: PassState) {
  return pass.unlimitedSwaps;
}

export function hasPriorityDelivery(pass: PassState) {
  return pass.priorityDelivery;
}

export function hasEarlyDropAccess(pass: PassState) {
  return pass.earlyDropAccess;
}

export function hasHumanStylist(pass: PassState) {
  return pass.humanStylist;
}

export type PassPlan = {
  id: PassId;
  name: string;
  price: number;
  outfits: string;
  perks: string[];
  highlight: boolean;
  rentalCredits: number;
  aiTryOnMonthlyLimit: number;
  rentalDuration: string;
  delivery: string;
  aiStylistUnlimited: boolean;
  vipInventoryAccess: boolean;
  unlimitedSwaps: boolean;
  priorityDelivery: boolean;
  earlyDropAccess: boolean;
  humanStylist: boolean;
};

export const PASS_PLANS: PassPlan[] = [
  { id: "FREE", name: "Free Pass", price: 0, outfits: "0 rental credits", perks: ["1 lifetime AI Try-On", "1 lifetime AI Stylist", "Browse DRIPPASS", "Explore collections"], highlight: false, rentalCredits: 0, aiTryOnMonthlyLimit: 0, rentalDuration: "-", delivery: "-", aiStylistUnlimited: false, vipInventoryAccess: false, unlimitedSwaps: false, priorityDelivery: false, earlyDropAccess: false, humanStylist: false },
  { id: "SILVER", name: "Silver Pass", price: 999, outfits: "2 rental credits / month", perks: ["10 AI Try-Ons / month", "Unlimited AI Stylist", "Free 3-day rentals", "Standard delivery"], highlight: false, rentalCredits: 2, aiTryOnMonthlyLimit: 10, rentalDuration: "Free 3-day", delivery: "Standard", aiStylistUnlimited: true, vipInventoryAccess: false, unlimitedSwaps: false, priorityDelivery: false, earlyDropAccess: false, humanStylist: false },
  { id: "GOLD", name: "Gold Pass", price: 1899, outfits: "4 rental credits / month", perks: ["Unlimited AI Try-On", "Unlimited AI Stylist", "Free 7-day rentals", "Priority delivery, zero deposit"], highlight: true, rentalCredits: 4, aiTryOnMonthlyLimit: -1, rentalDuration: "Free 7-day", delivery: "Priority", aiStylistUnlimited: true, vipInventoryAccess: false, unlimitedSwaps: false, priorityDelivery: true, earlyDropAccess: false, humanStylist: false },
  { id: "VIP", name: "Unlimited VIP Pass", price: 3499, outfits: "Unlimited swaps", perks: ["Unlimited AI fashion", "Any rental duration", "Same-day metro delivery", "Early drops and human stylist"], highlight: false, rentalCredits: 0, aiTryOnMonthlyLimit: -1, rentalDuration: "Any duration", delivery: "Same-day metro", aiStylistUnlimited: true, vipInventoryAccess: true, unlimitedSwaps: true, priorityDelivery: true, earlyDropAccess: true, humanStylist: true },
];

export function getPassPlan(planId: PassId) {
  return PASS_PLANS.find((plan) => plan.id === planId) ?? PASS_PLANS[0]!;
}

const SessionInput = z.object({ accessToken: z.string().min(20) });
const ConsumeInput = SessionInput.extend({ feature: z.enum(["AI_TRY_ON", "AI_STYLIST"]), idempotencyKey: z.string().min(8).max(120) });

async function getAuthorizedClient(accessToken: string) {
  const url = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"];
  const key = process.env["SUPABASE_ANON_KEY"] ?? process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ?? process.env["VITE_SUPABASE_ANON_KEY"];
  if (!url || !key) throw new Error("Persistence service is not configured.");
  const client = (await import("@supabase/supabase-js")).createClient(url, key, {
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
  });
  const { data, error } = await client.auth.getUser(accessToken);
  if (error || !data.user) throw new Error("Authentication required.");
  return client;
}

export const getPassState = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => SessionInput.parse(data))
  .handler(async ({ data }): Promise<PassState> => {
    const client = await getAuthorizedClient(data.accessToken);
    const [
      { data: subscription, error: subscriptionError },
      { data: entitlement, error: entitlementError },
      { data: usageEvents, error: usageError },
    ] = await Promise.all([
      client.from("subscriptions").select("plan_id, status, current_period_start").eq("status", "ACTIVE").maybeSingle(),
      client.from("pass_entitlements").select("ai_try_on_uses, ai_stylist_uses, rental_credits").maybeSingle(),
      client.from("pass_usage_events").select("feature, created_at"),
    ]);
    if (subscriptionError || entitlementError || usageError) throw new Error("Pass details could not be loaded.");
      const planId = (subscription?.plan_id as PassId | undefined) ?? "FREE";
      const plan = getPassPlan(planId);
    const currentPeriodStart = subscription?.current_period_start ?? new Date(0).toISOString();
    const monthlyTryOnUsed = usageEvents?.filter((event) => event.feature === "AI_TRY_ON" && event.created_at >= currentPeriodStart).length ?? 0;
    return {
      planId,
      status: (subscription?.status as PassStatus | undefined) ?? "ACTIVE",
      aiTryOnUses: planId === "FREE" ? entitlement?.ai_try_on_uses ?? 1 : planId === "SILVER" ? Math.max(0, plan.aiTryOnMonthlyLimit - monthlyTryOnUsed) : -1,
      aiStylistUses: planId === "FREE" ? entitlement?.ai_stylist_uses ?? 1 : -1,
      unlimitedSwaps: plan.unlimitedSwaps,
      vipInventoryAccess: plan.vipInventoryAccess,
      rentalCredits: planId === "FREE" || planId === "VIP" ? plan.rentalCredits : entitlement?.rental_credits ?? plan.rentalCredits,
      aiTryOnMonthlyLimit: plan.aiTryOnMonthlyLimit,
      rentalDuration: plan.rentalDuration,
      delivery: plan.delivery,
      priorityDelivery: plan.priorityDelivery,
      earlyDropAccess: plan.earlyDropAccess,
      humanStylist: plan.humanStylist,
    };
  });

export const activatePaidPass = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => SessionInput.extend({ planId: z.enum(["SILVER", "GOLD", "VIP"]), activationKey: z.string().min(8).max(120) }).parse(data))
  .handler(async ({ data }) => {
    const client = await getAuthorizedClient(data.accessToken);
    const { data: result, error } = await client.rpc("activate_paid_pass", {
      target_plan: data.planId,
      activation_key: data.activationKey,
    });
    if (error) throw new Error("Pass activation could not be completed.");
    const row = Array.isArray(result) ? result[0] : result;
    return { planId: row?.plan_id as PassId, status: row?.status as PassStatus };
  });

export const consumePassFeature = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => ConsumeInput.parse(data))
  .handler(async ({ data }) => {
    return consumePassFeatureForToken(data.accessToken, data.feature, data.idempotencyKey);
  });

export async function consumePassFeatureForToken(accessToken: string, feature: "AI_TRY_ON" | "AI_STYLIST", idempotencyKey: string) {
    const client = await getAuthorizedClient(accessToken);
    const { data: result, error } = await client.rpc("consume_pass_feature", {
      feature_name: feature,
      request_key: idempotencyKey,
    });
    if (error) throw new Error("Pass access could not be verified.");
    const row = Array.isArray(result) ? result[0] : result;
    return { allowed: Boolean(row?.allowed), remaining: Number(row?.remaining ?? 0) };
}

export const consumeRentalCredit = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => SessionInput.extend({ credits: z.number().int().min(1).max(20) }).parse(data))
  .handler(async ({ data }) => {
    const client = await getAuthorizedClient(data.accessToken);
    const { data: result, error } = await client.rpc("consume_rental_credit", { credit_count: data.credits });
    if (error) throw new Error("Pass access could not be verified.");
    const row = Array.isArray(result) ? result[0] : result;
    return { allowed: Boolean(row?.allowed), remaining: Number(row?.remaining ?? 0) };
  });

export async function consumeRentalCreditForToken(accessToken: string, credits: number) {
  const client = await getAuthorizedClient(accessToken);
  const { data: result, error } = await client.rpc("consume_rental_credit", { credit_count: credits });
  if (error) throw new Error("Pass access could not be verified.");
  const row = Array.isArray(result) ? result[0] : result;
  return { allowed: Boolean(row?.allowed), remaining: Number(row?.remaining ?? 0) };
}

