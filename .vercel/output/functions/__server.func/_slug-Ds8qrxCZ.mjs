import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "./_libs/@radix-ui/react-accordion+[...].mjs";
import { I as CalendarDays, N as Check, d as ShieldCheck, j as ChevronLeft } from "./_libs/lucide-react.mjs";
import { r as Route$1 } from "./_ssr/router-Cew3Veff.mjs";
import { t as Button } from "./_ssr/button-PwNqyxv_.mjs";
import { t as Input } from "./_ssr/input-uzm9g8Y7.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as Badge } from "./_ssr/badge-B3f60TId.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-Ds8qrxCZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductDetail() {
	const { product } = Route$1.useLoaderData();
	const [activeImage, setActiveImage] = (0, import_react.useState)(0);
	const [size, setSize] = (0, import_react.useState)();
	const [startDate, setStartDate] = (0, import_react.useState)(() => new Date(Date.now() + 2592e5).toISOString().slice(0, 10));
	const [endDate, setEndDate] = (0, import_react.useState)(() => new Date(Date.now() + 864e6).toISOString().slice(0, 10));
	const rentalDays = Math.max(1, Math.round(((/* @__PURE__ */ new Date(`${endDate}T00:00:00Z`)).getTime() - (/* @__PURE__ */ new Date(`${startDate}T00:00:00Z`)).getTime()) / 864e5));
	const addToRentalCart = () => {
		if (/* @__PURE__ */ new Date(`${endDate}T00:00:00Z`) < /* @__PURE__ */ new Date(`${startDate}T00:00:00Z`)) {
			toast.error("Choose an end date after the start date.");
			return;
		}
		const existing = JSON.parse(window.localStorage.getItem("drippass.cart") ?? "[]");
		const next = existing.some((item) => item.product.id === product.id) ? existing : [...existing, {
			product,
			days: rentalDays,
			size
		}];
		window.localStorage.setItem("drippass.cart", JSON.stringify(next));
		window.dispatchEvent(new Event("drippass:cart-updated"));
		toast.success(`${product.title} added to your rental cart`);
		window.location.assign("/?cart=open");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-6 md:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: "/rent",
				className: "inline-flex items-center gap-1 text-xs tracking-luxe text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-3" }), " BACK TO THE ROTATION"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "aspect-[3/4] overflow-hidden bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: product.gallery[activeImage],
						alt: `${product.title} by ${product.designer}`,
						className: "h-full w-full object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid grid-cols-3 gap-3",
					children: product.gallery.map((image, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setActiveImage(index),
						className: `aspect-[3/4] overflow-hidden border ${index === activeImage ? "border-foreground" : "border-transparent opacity-60"}`,
						"aria-label": `View image ${index + 1}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: image,
							alt: "",
							className: "h-full w-full object-cover"
						})
					}, image))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "lg:py-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-luxe text-muted-foreground",
							children: product.designer
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 font-display text-4xl leading-tight md:text-5xl",
							children: product.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: "rounded-none",
								children: product.event
							}), product.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: "rounded-none",
								children: product.badge
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 border-y border-border py-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted-foreground line-through",
									children: ["Retail ₹", product.retail.toLocaleString("en-IN")]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-display text-4xl",
									children: [
										"₹",
										product.perDay.toLocaleString("en-IN"),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-sans text-sm text-muted-foreground",
											children: "/ day"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: `mt-2 text-sm ${product.rentalStatus === "AVAILABLE" ? "text-emerald-600" : "text-muted-foreground"}`,
									children: product.rentalStatus === "AVAILABLE" ? "Available to reserve" : product.rentalStatus === "RESERVED" ? "Currently Reserved" : "Not Available for Rent"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-3 text-xs tracking-luxe text-muted-foreground",
								children: "SELECT SIZE"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: product.sizes.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setSize(option),
									className: `h-10 w-12 border text-sm ${size === option ? "border-foreground bg-foreground text-background" : "border-border"}`,
									children: option
								}, option))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "rental-start",
									className: "text-xs",
									children: "Rental starts"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "rental-start",
									type: "date",
									min: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
									value: startDate,
									onChange: (event) => setStartDate(event.target.value)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "rental-end",
									className: "text-xs",
									children: "Rental ends"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "rental-end",
									type: "date",
									min: startDate,
									value: endDate,
									onChange: (event) => setEndDate(event.target.value)
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "mt-8 h-12 w-full rounded-none bg-gradient-neon text-foreground",
							disabled: !product.available || !size,
							onClick: addToRentalCart,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-4" }),
								" ",
								product.available ? size ? "Add to rental cart" : "Select a size to continue" : "Waitlist unavailable"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/try-on",
							search: { product: product.slug },
							className: "mt-3 inline-flex w-full items-center justify-center border border-border px-4 py-3 text-sm hover:bg-muted",
							children: "Try this garment in AI Studio"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 space-y-3 border border-border p-5 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-gold" }), " Dry-cleaned and disinfected before delivery"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-gold" }), " Prepaid return bag and pickup included"]
							})]
						})
					]
				})]
			})]
		})
	});
}
//#endregion
export { ProductDetail as component };
