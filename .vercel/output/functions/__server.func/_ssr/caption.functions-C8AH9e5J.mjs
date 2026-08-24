import { n as createServerFn } from "./server-Bne-Pueh.mjs";
import { t as createServerRpc } from "./createServerRpc-DG4Ys8g8.mjs";
import { t as generateText } from "./ai-connector-DAd-fyzy.mjs";
import { i as stringType, r as objectType, t as enumType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/caption.functions-C8AH9e5J.js
var CaptionInput = objectType({
	outfit: stringType().min(1).max(200),
	platform: enumType(["instagram", "tiktok"]),
	vibe: stringType().max(120).optional()
});
var generateCaption_createServerFn_handler = createServerRpc({
	id: "0256f1d9b6827f7d75fcf86b8099efe92a7cad43c1180135f2bf345903705c65",
	name: "generateCaption",
	filename: "src/lib/caption.functions.ts"
}, (opts) => generateCaption.__executeServer(opts));
var generateCaption = createServerFn({ method: "POST" }).validator((data) => CaptionInput.parse(data)).handler(generateCaption_createServerFn_handler, async ({ data }) => {
	return { caption: (await generateText({
		system: "You write short, punchy Gen Z social captions for DRIPPASS, a designer outfit rental service. Return ONLY the caption: one or two lines of copy, then 5-7 relevant hashtags on a new line (always include #DRIPPASS and #RentedNotBought). Instagram = editorial and aspirational; TikTok = playful, hook-first. No quotes, no markdown, under 45 words total.",
		user: `Platform: ${data.platform}. Outfit: ${data.outfit}.${data.vibe ? ` Vibe: ${data.vibe}.` : ""}`
	})).trim() || "Rented the look, kept the moment.\n#DRIPPASS #RentedNotBought" };
});
//#endregion
export { generateCaption_createServerFn_handler };
