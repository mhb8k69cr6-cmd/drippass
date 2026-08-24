import { n as createServerFn } from "./server-Bne-Pueh.mjs";
import { t as createServerRpc } from "./createServerRpc-DG4Ys8g8.mjs";
import { t as generateText } from "./ai-connector-DAd-fyzy.mjs";
import { i as stringType, r as objectType } from "../_libs/zod.mjs";
import { n as consumePassFeatureForToken } from "./pass.functions-D8y6P_Ll.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stylist.functions-DLk7wUV-.js
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
