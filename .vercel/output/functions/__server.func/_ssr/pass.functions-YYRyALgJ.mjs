import { n as createServerFn } from "./server-D5qxpzfe.mjs";
import { t as createSsrRpc } from "./createSsrRpc-D3foSUYq.mjs";
import { a as stringType, i as objectType, n as enumType, r as numberType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pass.functions-YYRyALgJ.js
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
var getPassState = createServerFn({ method: "POST" }).inputValidator((data) => SessionInput.parse(data)).handler(createSsrRpc("9bbdb3b107d7461297d2491dd8c2e12de57cb2b7a0bad37f65b4206d35529d0d"));
var activatePaidPass = createServerFn({ method: "POST" }).inputValidator((data) => SessionInput.extend({
	planId: enumType([
		"SILVER",
		"GOLD",
		"VIP"
	]),
	activationKey: stringType().min(8).max(120)
}).parse(data)).handler(createSsrRpc("6379058b6dec8681aba2ae133131d530e10a93aaaa20b462bbb8320e858c3390"));
createServerFn({ method: "POST" }).inputValidator((data) => ConsumeInput.parse(data)).handler(createSsrRpc("3c9895fb9d31b4c4bcefc9c99fdb42dff5decb1aa5127e62c882d40225a54db6"));
async function consumePassFeatureForToken(accessToken, feature, idempotencyKey) {
	const { data: result, error } = await (await getAuthorizedClient(accessToken)).rpc("consume_pass_feature", {
		feature_name: feature,
		request_key: idempotencyKey
	});
	if (error) throw new Error("Pass access could not be verified.");
	const row = Array.isArray(result) ? result[0] : result;
	return {
		allowed: Boolean(row?.allowed),
		remaining: Number(row?.remaining ?? 0)
	};
}
createServerFn({ method: "POST" }).inputValidator((data) => SessionInput.extend({ credits: numberType().int().min(1).max(20) }).parse(data)).handler(createSsrRpc("178f351ec97935f12ded5229bf96bf6f332ae7dd89fc7ae628beb4f46ee9dfcf"));
async function consumeRentalCreditForToken(accessToken, credits) {
	const { data: result, error } = await (await getAuthorizedClient(accessToken)).rpc("consume_rental_credit", { credit_count: credits });
	if (error) throw new Error("Pass access could not be verified.");
	const row = Array.isArray(result) ? result[0] : result;
	return {
		allowed: Boolean(row?.allowed),
		remaining: Number(row?.remaining ?? 0)
	};
}
//#endregion
export { getPassPlan as a, consumeRentalCreditForToken as i, activatePaidPass as n, getPassState as o, consumePassFeatureForToken as r, PASS_PLANS as t };
