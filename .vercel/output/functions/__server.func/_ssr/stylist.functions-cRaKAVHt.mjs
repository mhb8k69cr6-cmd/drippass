import { n as createServerFn } from "./server-91Kitgjm.mjs";
import { a as stringType, i as objectType } from "../_libs/zod.mjs";
import { r as consumePassFeatureForToken } from "./pass.functions-YTYGypKC.mjs";
import { t as createServerRpc } from "./createServerRpc-C3i3sE4u.mjs";
import { t as generateText } from "./ai-connector-DAd-fyzy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stylist.functions-cRaKAVHt.js
var StylistInput = objectType({
	question: stringType().min(1).max(500),
	outfit: stringType().max(200).optional(),
	accessToken: stringType().min(20),
	idempotencyKey: stringType().min(8).max(120)
});
var askStylist_createServerFn_handler = createServerRpc({
	id: "65d9005d1b7cdb4d050cce73c4ab15ece8c7642241a0742a1084a688f4d178dd",
	name: "askStylist",
	filename: "src/lib/stylist.functions.ts"
}, (opts) => askStylist.__executeServer(opts));
var askStylist = createServerFn({ method: "POST" }).validator((data) => StylistInput.parse(data)).handler(askStylist_createServerFn_handler, async ({ data }) => {
	const text = await generateText({
		system: "You are the DRIPPASS AI Stylist, a sharp Gen Z fashion advisor for a luxury outfit rental service. Give confident, specific styling advice: shoes, accessories, layering, dress-code fit. Keep answers under 90 words, no markdown headings, warm but editorial tone.",
		user: data.outfit ? `The user is currently previewing this rental: ${data.outfit}. Question: ${data.question}` : data.question
	});
	if (!(await consumePassFeatureForToken(data.accessToken, "AI_STYLIST", data.idempotencyKey)).allowed) throw new Error("You've used your free AI Stylist session. Explore Passes to keep styling with AI.");
	return { reply: text.trim() || "Tell me a bit more about the occasion and I'll style it." };
});
//#endregion
export { askStylist_createServerFn_handler };
