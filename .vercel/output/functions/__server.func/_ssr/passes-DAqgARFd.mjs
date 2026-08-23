import { o as PLANS } from "./products-sweX_gG3.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { M as Check, T as Crown } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-PwNqyxv_.mjs";
import { t as Badge } from "./badge-B3f60TId.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/passes-DAqgARFd.js
var import_jsx_runtime = require_jsx_runtime();
function SubscriptionPlans() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "grid gap-4 md:grid-cols-3",
		children: PLANS.map((plan) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `flex flex-col border p-6 ${plan.highlight ? "border-foreground bg-card shadow-soft" : "border-border bg-card"}`,
			children: [
				plan.highlight && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					className: "mb-3 w-fit gap-1 rounded-none bg-gradient-neon text-[10px] tracking-luxe text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "size-3" }), " MOST RENTED"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-2xl",
					children: plan.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: plan.outfits
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 font-display text-4xl",
					children: [
						"₹",
						plan.price,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-sans text-sm text-muted-foreground",
							children: "/mo"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-5 space-y-2.5 text-sm",
					children: plan.perks.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 shrink-0 text-gold" }), p]
					}, p))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => toast.error("Pass selection is unavailable: no membership or billing service is configured."),
					className: `mt-6 w-full rounded-none ${plan.highlight ? "bg-gradient-neon text-foreground hover:opacity-90" : ""}`,
					variant: plan.highlight ? "default" : "outline",
					children: ["Choose ", plan.name]
				})
			]
		}, plan.name))
	});
}
function PassesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-background px-4 py-10 pb-32 md:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-luxe text-muted-foreground",
					children: "DRIPPASS MEMBERSHIP"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl md:text-6xl",
					children: "Choose your rotation."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-xl text-sm text-muted-foreground",
					children: "Compare the available plans. Membership activation is currently unavailable until billing and account services are connected."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubscriptionPlans, {})
				})
			]
		})
	});
}
//#endregion
export { PassesPage as component };
