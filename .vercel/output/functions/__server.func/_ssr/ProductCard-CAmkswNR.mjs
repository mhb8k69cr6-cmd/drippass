import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { C as Heart, c as Sparkles, s as Star } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-PwNqyxv_.mjs";
import { t as Badge } from "./badge-B3f60TId.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductCard-CAmkswNR.js
var import_jsx_runtime = require_jsx_runtime();
function ProductCard({ product, onOpen, onTryOn, onSave, saved, href }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "group flex flex-col overflow-hidden border border-border bg-card transition-shadow hover:shadow-soft",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[3/4] overflow-hidden bg-muted",
			children: [
				href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href,
					className: "block h-full w-full",
					"aria-label": `View ${product.title}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: product.image,
						alt: `${product.title} by ${product.designer}`,
						loading: "lazy",
						width: 768,
						height: 1024,
						className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onOpen,
					className: "block h-full w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: product.image,
						alt: `${product.title} by ${product.designer}`,
						loading: "lazy",
						width: 768,
						height: 1024,
						className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
					})
				}),
				product.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					className: "absolute left-3 top-3 rounded-none bg-foreground text-[10px] tracking-luxe text-background",
					children: product.badge
				}),
				!href && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onSave,
					"aria-label": "Save to lookbook",
					className: "absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-background/90 backdrop-blur",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `size-4 ${saved ? "fill-destructive text-destructive" : ""}` })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: onTryOn,
					size: "sm",
					className: "absolute inset-x-3 bottom-3 translate-y-2 gap-1.5 rounded-none bg-gradient-neon text-xs text-foreground opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), " Try On in AI Studio"]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-1.5 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] tracking-luxe text-muted-foreground",
					children: product.designer
				}),
				href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href,
					className: "text-left text-sm font-medium leading-snug hover:underline",
					children: product.title
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onOpen,
					className: "text-left text-sm font-medium leading-snug hover:underline",
					children: product.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-0.5 bg-foreground px-1.5 py-0.5 text-background",
						children: [
							product.rating,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-2.5 fill-current" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted-foreground",
						children: [
							"(",
							product.reviews,
							")"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto pt-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground line-through",
							children: ["Retail ₹", product.retail.toLocaleString("en-IN")]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-xl",
							children: [
								"₹",
								product.perDay,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-sans text-xs text-muted-foreground",
									children: " / day"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `mt-1 text-xs ${product.available ? "text-foreground" : "text-destructive"}`,
							children: product.available ? "● In stock — ships tomorrow" : "○ Sold out — join waitlist"
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { ProductCard as t };
