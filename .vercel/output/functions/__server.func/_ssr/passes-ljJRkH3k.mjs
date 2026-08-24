import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { o as getPassState, t as PASS_PLANS } from "./pass.functions-YYRyALgJ.mjs";
import { N as Check, T as Crown } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-PwNqyxv_.mjs";
import { t as currentAccessToken } from "./pass-client-DF7B3yFQ.mjs";
import { t as Badge } from "./badge-B3f60TId.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/passes-ljJRkH3k.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SubscriptionPlans() {
	const [pass, setPass] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const loadPass = useServerFn(getPassState);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		let active = true;
		currentAccessToken().then((accessToken) => {
			if (!accessToken) {
				setError("Sign in to view and manage your pass.");
				setLoading(false);
				return;
			}
			return loadPass({ data: { accessToken } }).then((state) => {
				if (active) setPass(state);
			});
		}).catch(() => {
			if (active) setError("Your pass details could not be loaded.");
		}).finally(() => {
			if (active) setLoading(false);
		});
		return () => {
			active = false;
		};
	}, [loadPass]);
	const choose = async (planId) => {
		if (planId === "FREE") {
			if (pass?.planId === "FREE") return;
			await navigate({ to: "/signup" });
			return;
		}
		await navigate({
			to: "/checkout/membership/$plan",
			params: { plan: planId.toLowerCase() }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-6 text-sm text-muted-foreground",
			children: "Loading your pass..."
		}),
		error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			role: "alert",
			className: "mb-6 border border-destructive/40 p-4 text-sm text-destructive",
			children: error
		}),
		pass && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-6 border border-border bg-card p-5 shadow-soft",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] tracking-luxe text-muted-foreground",
				children: "YOUR DRIPPASS"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl",
					children: PASS_PLANS.find((plan) => plan.id === pass.planId)?.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: pass.planId === "FREE" ? "₹0 · lifetime introductory access" : "Active pass"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-4 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: "AI Try-On"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-medium",
							children: pass.aiTryOnUses < 0 ? "Unlimited" : `${pass.aiTryOnUses} remaining`
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: "AI Stylist"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-medium",
							children: pass.aiStylistUses < 0 ? "Unlimited" : `${pass.aiStylistUses} remaining`
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: "Rental credits"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-medium",
							children: pass.unlimitedSwaps ? "Unlimited" : pass.rentalCredits
						})] })
					]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4",
			children: PASS_PLANS.map((plan) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `flex flex-col border p-6 ${plan.highlight ? "rounded-2xl border-foreground bg-transparent shadow-soft" : "rounded-2xl border-border bg-transparent"}`,
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => void choose(plan.id),
						disabled: pass?.planId === plan.id,
						className: `mt-6 w-full rounded-none ${plan.highlight ? "bg-gradient-neon text-foreground hover:opacity-90" : ""}`,
						variant: plan.highlight ? "default" : "outline",
						children: pass?.planId === plan.id ? "Current Pass" : plan.id === "FREE" ? "Start Free" : `Choose ${plan.name}`
					})
				]
			}, plan.name))
		})
	] });
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
					children: "Start with a Free Pass, then upgrade when you are ready for more rentals and unlimited styling."
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
