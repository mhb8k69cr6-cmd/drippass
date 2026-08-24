import { n as createServerFn } from "./server-v64h6jUS.mjs";
import { a as stringType, i as objectType, n as enumType, r as numberType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-B0CWdwpI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pass.functions-BYespZ6F.js
var PASS_PLANS = [
	{
		id: "FREE",
		name: "Free Pass",
		price: 0,
		outfits: "0 rental credits",
		perks: [
			"1 lifetime AI Try-On",
			"1 lifetime AI Stylist",
			"Browse DRIPPASS",
			"Explore collections"
		],
		highlight: false,
		rentalCredits: 0,
		aiTryOnMonthlyLimit: 0,
		rentalDuration: "-",
		delivery: "-",
		aiStylistUnlimited: false,
		vipInventoryAccess: false,
		unlimitedSwaps: false,
		priorityDelivery: false,
		earlyDropAccess: false,
		humanStylist: false
	},
	{
		id: "SILVER",
		name: "Silver Pass",
		price: 999,
		outfits: "2 rental credits / month",
		perks: [
			"10 AI Try-Ons / month",
			"Unlimited AI Stylist",
			"Free 3-day rentals",
			"Standard delivery"
		],
		highlight: false,
		rentalCredits: 2,
		aiTryOnMonthlyLimit: 10,
		rentalDuration: "Free 3-day",
		delivery: "Standard",
		aiStylistUnlimited: true,
		vipInventoryAccess: false,
		unlimitedSwaps: false,
		priorityDelivery: false,
		earlyDropAccess: false,
		humanStylist: false
	},
	{
		id: "GOLD",
		name: "Gold Pass",
		price: 1899,
		outfits: "4 rental credits / month",
		perks: [
			"Unlimited AI Try-On",
			"Unlimited AI Stylist",
			"Free 7-day rentals",
			"Priority delivery, zero deposit"
		],
		highlight: true,
		rentalCredits: 4,
		aiTryOnMonthlyLimit: -1,
		rentalDuration: "Free 7-day",
		delivery: "Priority",
		aiStylistUnlimited: true,
		vipInventoryAccess: false,
		unlimitedSwaps: false,
		priorityDelivery: true,
		earlyDropAccess: false,
		humanStylist: false
	},
	{
		id: "VIP",
		name: "Unlimited VIP Pass",
		price: 3499,
		outfits: "Unlimited swaps",
		perks: [
			"Unlimited AI fashion",
			"Any rental duration",
			"Same-day metro delivery",
			"Early drops and human stylist"
		],
		highlight: false,
		rentalCredits: 0,
		aiTryOnMonthlyLimit: -1,
		rentalDuration: "Any duration",
		delivery: "Same-day metro",
		aiStylistUnlimited: true,
		vipInventoryAccess: true,
		unlimitedSwaps: true,
		priorityDelivery: true,
		earlyDropAccess: true,
		humanStylist: true
	}
];
function getPassPlan(planId) {
	return PASS_PLANS.find((plan) => plan.id === planId) ?? PASS_PLANS[0];
}
var SessionInput = objectType({ accessToken: stringType().min(20) });
var ConsumeInput = SessionInput.extend({
	feature: enumType(["AI_TRY_ON", "AI_STYLIST"]),
	idempotencyKey: stringType().min(8).max(120)
});
async function getAuthorizedClient(accessToken) {
	const url = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"];
	const key = process.env["SUPABASE_ANON_KEY"] ?? process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ?? process.env["VITE_SUPABASE_ANON_KEY"];
	if (!url || !key) throw new Error("Persistence service is not configured.");
	const client = (await import("../_libs/@supabase/ssr+[...].mjs").then((n) => n.n)).createClient(url, key, { global: { headers: { Authorization: `Bearer ${accessToken}` } } });
	const { data, error } = await client.auth.getUser(accessToken);
	if (error || !data.user) throw new Error("Authentication required.");
	return client;
}
var getPassState_createServerFn_handler = createServerRpc({
	id: "9bbdb3b107d7461297d2491dd8c2e12de57cb2b7a0bad37f65b4206d35529d0d",
	name: "getPassState",
	filename: "src/lib/pass.functions.ts"
}, (opts) => getPassState.__executeServer(opts));
var getPassState = createServerFn({ method: "POST" }).inputValidator((data) => SessionInput.parse(data)).handler(getPassState_createServerFn_handler, async ({ data }) => {
	const client = await getAuthorizedClient(data.accessToken);
	const [{ data: subscription, error: subscriptionError }, { data: entitlement, error: entitlementError }, { data: usageEvents, error: usageError }] = await Promise.all([
		client.from("subscriptions").select("plan_id, status, current_period_start").eq("status", "ACTIVE").maybeSingle(),
		client.from("pass_entitlements").select("ai_try_on_uses, ai_stylist_uses, rental_credits").maybeSingle(),
		client.from("pass_usage_events").select("feature, created_at")
	]);
	if (subscriptionError || entitlementError || usageError) throw new Error("Pass details could not be loaded.");
	const planId = subscription?.plan_id ?? "FREE";
	const plan = getPassPlan(planId);
	const currentPeriodStart = subscription?.current_period_start ?? (/* @__PURE__ */ new Date(0)).toISOString();
	const monthlyTryOnUsed = usageEvents?.filter((event) => event.feature === "AI_TRY_ON" && event.created_at >= currentPeriodStart).length ?? 0;
	return {
		planId,
		status: subscription?.status ?? "ACTIVE",
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
		humanStylist: plan.humanStylist
	};
});
var activatePaidPass_createServerFn_handler = createServerRpc({
	id: "6379058b6dec8681aba2ae133131d530e10a93aaaa20b462bbb8320e858c3390",
	name: "activatePaidPass",
	filename: "src/lib/pass.functions.ts"
}, (opts) => activatePaidPass.__executeServer(opts));
var activatePaidPass = createServerFn({ method: "POST" }).inputValidator((data) => SessionInput.extend({
	planId: enumType([
		"SILVER",
		"GOLD",
		"VIP"
	]),
	activationKey: stringType().min(8).max(120)
}).parse(data)).handler(activatePaidPass_createServerFn_handler, async ({ data }) => {
	const { data: result, error } = await (await getAuthorizedClient(data.accessToken)).rpc("activate_paid_pass", {
		target_plan: data.planId,
		activation_key: data.activationKey
	});
	if (error) throw new Error("Pass activation could not be completed.");
	const row = Array.isArray(result) ? result[0] : result;
	return {
		planId: row?.plan_id,
		status: row?.status
	};
});
var consumePassFeature_createServerFn_handler = createServerRpc({
	id: "3c9895fb9d31b4c4bcefc9c99fdb42dff5decb1aa5127e62c882d40225a54db6",
	name: "consumePassFeature",
	filename: "src/lib/pass.functions.ts"
}, (opts) => consumePassFeature.__executeServer(opts));
var consumePassFeature = createServerFn({ method: "POST" }).inputValidator((data) => ConsumeInput.parse(data)).handler(consumePassFeature_createServerFn_handler, async ({ data }) => {
	return consumePassFeatureForToken(data.accessToken, data.feature, data.idempotencyKey);
});
async function consumePassFeatureForToken(accessToken, feature, idempotencyKey) {
	const { data: result, error } = await (await getAuthorizedClient(accessToken)).rpc("consume_pass_feature", {
		feature_name: feature,
		request_key: idempotencyKey
	});
	if (error?.code === "PGRST202" || error?.code === "PGRST205") return {
		allowed: true,
		remaining: -1
	};
	if (error) throw new Error(`Pass access could not be verified: ${error.message}`);
	const row = Array.isArray(result) ? result[0] : result;
	return {
		allowed: Boolean(row?.allowed),
		remaining: Number(row?.remaining ?? 0)
	};
}
var consumeRentalCredit_createServerFn_handler = createServerRpc({
	id: "178f351ec97935f12ded5229bf96bf6f332ae7dd89fc7ae628beb4f46ee9dfcf",
	name: "consumeRentalCredit",
	filename: "src/lib/pass.functions.ts"
}, (opts) => consumeRentalCredit.__executeServer(opts));
var consumeRentalCredit = createServerFn({ method: "POST" }).inputValidator((data) => SessionInput.extend({ credits: numberType().int().min(1).max(20) }).parse(data)).handler(consumeRentalCredit_createServerFn_handler, async ({ data }) => {
	const { data: result, error } = await (await getAuthorizedClient(data.accessToken)).rpc("consume_rental_credit", { credit_count: data.credits });
	if (error) throw new Error("Pass access could not be verified.");
	const row = Array.isArray(result) ? result[0] : result;
	return {
		allowed: Boolean(row?.allowed),
		remaining: Number(row?.remaining ?? 0)
	};
});
//#endregion
export { activatePaidPass_createServerFn_handler, consumePassFeature_createServerFn_handler, consumeRentalCredit_createServerFn_handler, getPassState_createServerFn_handler };
