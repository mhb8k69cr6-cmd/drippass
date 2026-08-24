import { t as supabase } from "./supabase-DHkNjKmq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pass-client-DF7B3yFQ.js
async function currentAccessToken() {
	return (await supabase?.auth.getSession())?.data.session?.access_token;
}
//#endregion
export { currentAccessToken as t };
