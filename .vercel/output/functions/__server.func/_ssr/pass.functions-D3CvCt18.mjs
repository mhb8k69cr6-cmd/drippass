import { n as createServerFn } from "./server-Bne-Pueh.mjs";
import { t as createServerRpc } from "./createServerRpc-DG4Ys8g8.mjs";
import { i as stringType, n as numberType, r as objectType, t as enumType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pass.functions-D3CvCt18.js
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
var getPassState_createServerFn_handler = createServerRpc({
	id: "9bbdb3b107d7461297d2491dd8c2e12de57cb2b7a0bad37f65b4206d35529d0d",
	name: "getPassState",
	filename: "src/lib/pass.functions.ts"
}, (opts) => getPassState.__executeServer(opts));
var getPassState = createServerFn({ method: "POST" }).inputValidator((data) => SessionInput.parse(data)).handler(getPassState_createServerFn_handler, async ({ data }) => {
	const client = await getAuthorizedClient(data.accessToken);
	const [{ data: subscription, error: subscriptionError }, { data: entitlement, error: entitlementError }] = await Promise.all([client.from("subscriptions").select("plan_id, status").eq("status", "ACTIVE").maybeSingle(), client.from("pass_entitlements").select("ai_try_on_uses, ai_stylist_uses, rental_credits").maybeSingle()]);
	if (subscriptionError || entitlementError) throw new Error("Pass details could not be loaded.");
	const planId = subscription?.plan_id ?? "FREE";
	const plan = planId === "SILVER" ? {
		rentalCredits: 2,
		unlimitedSwaps: false,
		vipInventoryAccess: false
	} : planId === "GOLD" ? {
		rentalCredits: 4,
		unlimitedSwaps: false,
		vipInventoryAccess: false
	} : planId === "VIP" ? {
		rentalCredits: 0,
		unlimitedSwaps: true,
		vipInventoryAccess: true
	} : {
		rentalCredits: 0,
		unlimitedSwaps: false,
		vipInventoryAccess: false
	};
	return {
		planId,
		status: subscription?.status ?? "ACTIVE",
		aiTryOnUses: planId === "FREE" ? entitlement?.ai_try_on_uses ?? 1 : -1,
		aiStylistUses: planId === "FREE" ? entitlement?.ai_stylist_uses ?? 1 : -1,
		...plan,
		rentalCredits: planId === "FREE" || planId === "VIP" ? plan.rentalCredits : entitlement?.rental_credits ?? plan.rentalCredits
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
	if (error) throw new Error("Pass access could not be verified.");
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
export { consumePassFeature_createServerFn_handler, consumeRentalCredit_createServerFn_handler, getPassState_createServerFn_handler };
