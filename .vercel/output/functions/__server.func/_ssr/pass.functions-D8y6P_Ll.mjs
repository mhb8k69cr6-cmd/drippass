import { n as createServerFn } from "./server-Bne-Pueh.mjs";
import { i as stringType, n as numberType, r as objectType, t as enumType } from "../_libs/zod.mjs";
import { t as createSsrRpc } from "./createSsrRpc-ivQp5kDz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pass.functions-D8y6P_Ll.js
var PASS_PLANS = [
	{
		id: "FREE",
		name: "Free Pass",
		price: 0,
		outfits: "No rental credits",
		perks: [
			"1 AI Try-On",
			"1 AI Stylist session",
			"Browse DRIPPASS",
			"Explore collections"
		],
		highlight: false
	},
	{
		id: "SILVER",
		name: "Silver Pass",
		price: 999,
		outfits: "2 outfits / month",
		perks: [
			"Free 3-day rentals",
			"Standard delivery",
			"Basic AI Stylist"
		],
		highlight: false
	},
	{
		id: "GOLD",
		name: "Gold Pass",
		price: 1899,
		outfits: "4 outfits / month",
		perks: [
			"Free 7-day rentals",
			"Priority delivery slots",
			"Full AI Try-On Studio",
			"Zero security deposit"
		],
		highlight: true
	},
	{
		id: "VIP",
		name: "Unlimited VIP Pass",
		price: 3499,
		outfits: "Unlimited swaps",
		perks: [
			"Any duration, any label",
			"Same-day delivery in metros",
			"Early access to drops",
			"Personal human stylist call"
		],
		highlight: false
	}
];
var SessionInput = objectType({ accessToken: stringType().min(20) });
var ConsumeInput = SessionInput.extend({
	feature: enumType(["AI_TRY_ON", "AI_STYLIST"]),
	idempotencyKey: stringType().min(8).max(120)
});
async function getAuthorizedClient(accessToken) {
	const url = process.env["SUPABASE_URL"];
	const key = process.env["SUPABASE_ANON_KEY"];
	if (!url || !key) throw new Error("Persistence service is not configured.");
	const client = (await import("../_libs/@supabase/ssr+[...].mjs").then((n) => n.n)).createClient(url, key, { global: { headers: { Authorization: `Bearer ${accessToken}` } } });
	const { data, error } = await client.auth.getUser(accessToken);
	if (error || !data.user) throw new Error("Authentication required.");
	return client;
}
var getPassState = createServerFn({ method: "POST" }).inputValidator((data) => SessionInput.parse(data)).handler(createSsrRpc("9bbdb3b107d7461297d2491dd8c2e12de57cb2b7a0bad37f65b4206d35529d0d"));
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
//#endregion
export { consumePassFeatureForToken as n, getPassState as r, PASS_PLANS as t };
