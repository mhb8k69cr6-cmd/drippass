import { s as PRODUCTS } from "./products-sweX_gG3.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as ProductCard } from "./ProductCard-CAmkswNR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rent-ep1IlEXa.js
var import_jsx_runtime = require_jsx_runtime();
function RentCollection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-10 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/",
					className: "text-xs tracking-luxe text-muted-foreground hover:text-foreground",
					children: "DRIPPASS / HOME"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-luxe text-muted-foreground",
						children: "THE ROTATION"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl",
						children: "Rent the look."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-sm text-sm text-muted-foreground",
						children: "Designer pieces, professionally prepared and priced by the rental day."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: PRODUCTS.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
						product,
						href: `/rent/${product.slug}`,
						saved: false,
						onSave: () => void 0,
						onOpen: () => void 0,
						onTryOn: () => void 0
					}, product.id))
				})
			]
		})
	});
}
//#endregion
export { RentCollection as component };
