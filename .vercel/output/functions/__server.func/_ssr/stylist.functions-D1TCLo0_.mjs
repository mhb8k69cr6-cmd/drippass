import { n as createServerFn } from "./server-Bk9SKquM.mjs";
import { n as generateText, t as createServerRpc } from "./ai-connector-rQsFrJbq.mjs";
import { n as objectType, r as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stylist.functions-D1TCLo0_.js
var StylistInput = objectType({
	question: stringType().min(1).max(500),
	outfit: stringType().max(200).optional()
});
var askStylist_createServerFn_handler = createServerRpc({
	id: "65d9005d1b7cdb4d050cce73c4ab15ece8c7642241a0742a1084a688f4d178dd",
	name: "askStylist",
	filename: "src/lib/stylist.functions.ts"
}, (opts) => askStylist.__executeServer(opts));
var askStylist = createServerFn({ method: "POST" }).validator((data) => StylistInput.parse(data)).handler(askStylist_createServerFn_handler, async ({ data }) => {
	return { reply: (await generateText({
		system: "You are the DRIPPASS AI Stylist, a sharp Gen Z fashion advisor for a luxury outfit rental service. Give confident, specific styling advice: shoes, accessories, layering, dress-code fit. Keep answers under 90 words, no markdown headings, warm but editorial tone.",
		user: data.outfit ? `The user is currently previewing this rental: ${data.outfit}. Question: ${data.question}` : data.question
	})).trim() || "Tell me a bit more about the occasion and I'll style it." };
});
//#endregion
export { askStylist_createServerFn_handler };
