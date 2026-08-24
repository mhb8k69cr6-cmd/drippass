import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link, y as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "./_libs/@radix-ui/react-accordion+[...].mjs";
import { a as getPassPlan, n as activatePaidPass } from "./_ssr/pass.functions-FFMFMQHJ.mjs";
import { E as CreditCard, N as Check, d as ShieldCheck, j as ChevronLeft } from "./_libs/lucide-react.mjs";
import { n as Route } from "./_ssr/router-5_FOEWFF.mjs";
import { t as Button } from "./_ssr/button-PwNqyxv_.mjs";
import { t as Input } from "./_ssr/input-uzm9g8Y7.mjs";
import { t as currentAccessToken } from "./_ssr/pass-client-DF7B3yFQ.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_plan-DlnuvkkN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MembershipCheckout() {
	const { plan: planParam } = Route.useParams();
	const planId = planParam.toUpperCase();
	const plan = getPassPlan(planId);
	const navigate = useNavigate();
	const [cardNumber, setCardNumber] = (0, import_react.useState)("");
	const [expiry, setExpiry] = (0, import_react.useState)("");
	const [cvc, setCvc] = (0, import_react.useState)("");
	const [state, setState] = (0, import_react.useState)("idle");
	if (!plan || plan.id === "FREE") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-background px-4 py-12 md:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-xl border border-border p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: "Free Pass activation happens automatically when you create an account."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/passes",
				className: "mt-4 inline-flex text-sm underline",
				children: "Back to passes"
			})]
		})
	});
	const submit = async (event) => {
		event.preventDefault();
		if (cardNumber.replace(/\s/g, "").length < 12 || !expiry || cvc.length < 3) {
			toast.error("Enter the test payment details to continue.");
			return;
		}
		setState("processing");
		try {
			const accessToken = await currentAccessToken();
			if (!accessToken) {
				await navigate({ to: "/login" });
				return;
			}
			await activatePaidPass({ data: {
				accessToken,
				planId: plan.id,
				activationKey: crypto.randomUUID()
			} });
			setState("success");
		} catch (error) {
			setState("idle");
			toast.error(error instanceof Error ? error.message : "Pass activation failed.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-background px-4 py-10 pb-32 md:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/passes",
				className: "inline-flex items-center gap-1 text-xs tracking-luxe text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-3" }), " BACK TO PASSES"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-8 lg:grid-cols-[1fr_0.9fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "border border-border bg-card p-6 shadow-soft md:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-luxe text-muted-foreground",
							children: "MEMBERSHIP CHECKOUT"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-3 font-display text-4xl",
							children: [
								"DRIPPASS ",
								plan.name.replace(" Pass", ""),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Digital membership only. No address, delivery details, or rental dates are collected here."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 border-y border-border py-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-3xl",
								children: [
									"₹",
									plan.price.toLocaleString("en-IN"),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-sans text-sm text-muted-foreground",
										children: " / month"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 space-y-2 text-sm",
								children: plan.perks.map((perk) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 shrink-0 text-gold" }), perk]
								}, perk))
							})]
						}),
						state === "success" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 border border-emerald-600/50 p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-medium",
									children: [plan.name, " activated."]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: "Your account now uses this pass as its single active membership."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "mt-4 rounded-none",
									onClick: () => void navigate({ to: "/passes" }),
									children: "View My Pass"
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "mt-8 space-y-4",
							onSubmit: submit,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2 text-xs tracking-luxe text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "size-4" }), " MOCK PAYMENT"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "This is a test checkout. No real payment is processed."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "membership-card",
										className: "text-xs",
										children: "Test card number"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "membership-card",
										required: true,
										inputMode: "numeric",
										value: cardNumber,
										onChange: (event) => setCardNumber(event.target.value),
										placeholder: "4242 4242 4242 4242"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "membership-expiry",
											className: "text-xs",
											children: "Expiry"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "membership-expiry",
											required: true,
											value: expiry,
											onChange: (event) => setExpiry(event.target.value),
											placeholder: "12/30"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "membership-cvc",
											className: "text-xs",
											children: "CVC"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "membership-cvc",
											required: true,
											value: cvc,
											onChange: (event) => setCvc(event.target.value),
											placeholder: "123"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									disabled: state === "processing",
									className: "w-full rounded-none bg-gradient-neon text-foreground",
									children: state === "processing" ? "Activating pass..." : `Start ${plan.name}`
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "border border-border p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-2 text-xs tracking-luxe text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-gold" }), " DIGITAL MEMBERSHIP"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 font-display text-2xl",
							children: "One account. One active pass."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Upgrades replace the active pass without deleting your rental history or lifetime Free Pass usage."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 space-y-3 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "✓ Memberships never enter the rental cart." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "✓ Activation is recorded server-side." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "✓ Mock payment is clearly labeled for demo use." })
							]
						})
					]
				})]
			})]
		})
	});
}
//#endregion
export { MembershipCheckout as component };
