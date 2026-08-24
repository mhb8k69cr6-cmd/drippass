import { t as TSS_SERVER_FUNCTION } from "./server-CDxyXkL1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/createServerRpc-DNyv67_9.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
export { createServerRpc as t };
