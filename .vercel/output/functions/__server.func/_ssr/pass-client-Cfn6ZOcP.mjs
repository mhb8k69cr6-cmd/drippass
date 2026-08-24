import { t as supabase } from "./supabase-BRX17_oZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pass-client-Cfn6ZOcP.js
async function currentAccessToken() {
	return (await supabase?.auth.getSession())?.data.session?.access_token;
}
//#endregion
export { currentAccessToken as t };
