import { i as __toESM } from "../_runtime.mjs";
import { l as getProductBySlug, s as PRODUCTS } from "./products-sweX_gG3.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { E as Copy, I as Bookmark, N as Camera, S as Instagram, b as LoaderCircle, c as Sparkles, d as ShieldCheck, f as Send, r as Upload, u as ShoppingBag, w as ExternalLink } from "../_libs/lucide-react.mjs";
import { r as Route$2 } from "./router-Co37hugf.mjs";
import { r as cn, t as Button } from "./button-PwNqyxv_.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-BA-nrckz.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as createServerFn } from "./server-Bk9SKquM.mjs";
import { n as objectType, r as stringType } from "../_libs/zod.mjs";
import { t as Label } from "./label-BeT0bXvu.mjs";
import { i as useServerFn, n as Separator, r as createSsrRpc, t as Checkbox } from "./createSsrRpc-DXacJ_2e.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/try-on-rpYBBx2l.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var StylistInput = objectType({
	question: stringType().min(1).max(500),
	outfit: stringType().max(200).optional()
});
var askStylist = createServerFn({ method: "POST" }).validator((data) => StylistInput.parse(data)).handler(createSsrRpc("65d9005d1b7cdb4d050cce73c4ab15ece8c7642241a0742a1084a688f4d178dd"));
function buildTryOnPrompt(garment, brand) {
	return `# AI Try-On Studio - Standard Garment Transfer Prompt

You are a professional virtual try-on compositing engine used inside a fashion e-commerce "try before you buy" tool. Act as an elite photo retoucher and garment-transfer specialist producing catalog-grade, photorealistic composites.

Two images are supplied with this request:

- 1_person_photo - the customer/model who wants to preview an item on themselves.
- 2_garment_photo - the reference photo of the item for sale. Extract the garment only.

## Request

1. From 1_person_photo, preserve exactly the person's face, facial features, expression, skin tone, hairstyle and hair texture, body shape and proportions, pose, background, lighting, and camera angle.
2. From 2_garment_photo, extract only the garment: exact colors, pattern, fabric texture, cut, silhouette, and construction details. Discard the other model, mannequin, body, face, hair, and background.
3. Replace the clothing worn by the person in 1_person_photo with the extracted garment, fitted to their exact body shape and pose.
4. Render physically accurate drape, folds, creases, weight distribution, shadows, and highlights consistent with 1_person_photo.
5. Reconstruct hidden garment portions only from the visible construction logic. Do not invent new design elements.
6. Composite one photorealistic image with no visible seams, warping, blending artifacts, or lighting mismatch.

## Garment context

Garment: ${garment}
Brand: ${brand}

## Deliverable

- Generate exactly one photorealistic image at the same resolution and aspect ratio as 1_person_photo.
- Match the garment's color, pattern, texture, and construction to 2_garment_photo exactly.
- Match the person's identity, pose, background, lighting, and camera framing to 1_person_photo exactly.
- Make the result look like an unedited studio/catalog photograph.

## Guardrails

- Never change the person's face, skin tone, body proportions, identity, expression, hair, pose, or background.
- Never transfer identity features from 2_garment_photo. Transfer garment details only.
- Never idealize, slim, enlarge, reshape, or otherwise alter the person's body.
- Never add, remove, or reinterpret garment details not present in 2_garment_photo.
- Self-check identity preservation, garment fidelity, and neckline, sleeve, and hem boundaries before returning the image. Fix any artifacts before finalizing.`;
}
var QUICK_PROMPTS = [
	"What shoes pair best with this?",
	"Is this formal enough for a university gala?",
	"Suggest accessories under ₹2000"
];
function crc32(bytes) {
	let crc = 4294967295;
	for (const byte of bytes) {
		crc ^= byte;
		for (let bit = 0; bit < 8; bit++) crc = crc >>> 1 ^ (crc & 1 ? 3988292384 : 0);
	}
	return (crc ^ 4294967295) >>> 0;
}
function zipFiles(files) {
	const encoder = new TextEncoder();
	const locals = [];
	const central = [];
	let offset = 0;
	for (const file of files) {
		const name = encoder.encode(file.name);
		const local = new Uint8Array(30 + name.length + file.bytes.length);
		const view = new DataView(local.buffer);
		view.setUint32(0, 67324752, true);
		view.setUint16(4, 20, true);
		view.setUint16(8, 0, true);
		view.setUint32(14, crc32(file.bytes), true);
		view.setUint32(18, file.bytes.length, true);
		view.setUint32(22, file.bytes.length, true);
		view.setUint16(26, name.length, true);
		local.set(name, 30);
		local.set(file.bytes, 30 + name.length);
		locals.push(local);
		const entry = new Uint8Array(46 + name.length);
		const entryView = new DataView(entry.buffer);
		entryView.setUint32(0, 33639248, true);
		entryView.setUint16(4, 20, true);
		entryView.setUint16(6, 20, true);
		entryView.setUint32(16, crc32(file.bytes), true);
		entryView.setUint32(20, file.bytes.length, true);
		entryView.setUint32(24, file.bytes.length, true);
		entryView.setUint16(28, name.length, true);
		entryView.setUint32(42, offset, true);
		entry.set(name, 46);
		central.push(entry);
		offset += local.length;
	}
	const centralBytes = central.reduce((total, item) => total + item.length, 0);
	const end = /* @__PURE__ */ new Uint8Array(22);
	const endView = new DataView(end.buffer);
	endView.setUint32(0, 101010256, true);
	endView.setUint16(8, files.length, true);
	endView.setUint16(10, files.length, true);
	endView.setUint32(12, centralBytes, true);
	endView.setUint32(16, offset, true);
	return new Blob([
		...locals,
		...central,
		end
	], { type: "application/zip" });
}
function AIStudio({ product, onRent, onSave }) {
	const [activeProduct, setActiveProduct] = (0, import_react.useState)(product);
	const [pickerOpen, setPickerOpen] = (0, import_react.useState)(false);
	const [userPhoto, setUserPhoto] = (0, import_react.useState)(null);
	const [localOnly, setLocalOnly] = (0, import_react.useState)(true);
	const [input, setInput] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	const [generating, setGenerating] = (0, import_react.useState)(false);
	const [consent, setConsent] = (0, import_react.useState)(false);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [messages, setMessages] = (0, import_react.useState)([{
		role: "assistant",
		text: "Hey — I'm your DRIPPASS stylist. Pick a fit from the feed, drop a full-body photo, and ask me anything about styling it."
	}]);
	const fileRef = (0, import_react.useRef)(null);
	const send = useServerFn(askStylist);
	(0, import_react.useEffect)(() => setActiveProduct(product), [product]);
	const prompt = buildTryOnPrompt(activeProduct?.title ?? "[INSERT GARMENT NAME]", activeProduct?.designer ?? "[INSERT BRAND NAME]");
	const handleFile = (file) => {
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => setUserPhoto(String(reader.result));
		reader.readAsDataURL(file);
	};
	const ask = async (question) => {
		if (!question.trim() || pending) return;
		setMessages((m) => [...m, {
			role: "user",
			text: question
		}]);
		setInput("");
		setPending(true);
		try {
			const res = await send({ data: {
				question,
				outfit: activeProduct ? `${activeProduct.title} by ${activeProduct.designer} (${activeProduct.category})` : void 0
			} });
			setMessages((m) => [...m, {
				role: "assistant",
				text: res.reply
			}]);
		} catch (e) {
			const msg = e instanceof Error ? e.message : "The stylist is unavailable. Configure an AI provider on the server.";
			toast.error(msg);
			setMessages((m) => [...m, {
				role: "assistant",
				text: msg
			}]);
		} finally {
			setPending(false);
		}
	};
	const runTryOn = async () => {
		if (!userPhoto || !activeProduct || !consent || generating) return;
		setGenerating(true);
		try {
			const personBlob = await fetch(userPhoto).then((response) => response.blob());
			const garmentBlob = await fetch(activeProduct.image).then((response) => {
				if (!response.ok) throw new Error("The garment image could not be downloaded.");
				return response.blob();
			});
			const personBytes = new Uint8Array(await personBlob.arrayBuffer());
			const garmentBytes = new Uint8Array(await garmentBlob.arrayBuffer());
			const archive = zipFiles([{
				name: "1_person_photo.jpg",
				bytes: personBytes
			}, {
				name: "2_garment_photo.jpg",
				bytes: garmentBytes
			}]);
			const link = document.createElement("a");
			link.href = URL.createObjectURL(archive);
			link.download = "drippass_tryon_assets.zip";
			link.click();
			URL.revokeObjectURL(link.href);
			await navigator.clipboard.writeText(prompt);
			window.open("https://chatgpt.com/images", "_blank", "noopener,noreferrer");
			setCopied(true);
			toast.success("ZIP file downloaded & prompt copied! Open ChatGPT Images, upload '1_person_photo' and '2_garment_photo', then paste (Ctrl+V) the prompt.");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Try-on generation failed.");
		} finally {
			setGenerating(false);
		}
	};
	const copyPrompt = async () => {
		await navigator.clipboard.writeText(prompt);
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1800);
	};
	const saveCurrentLook = () => {
		if (!activeProduct) return;
		const savedLooks = JSON.parse(window.localStorage.getItem("drippass.lookbook") ?? "[]");
		savedLooks.unshift({
			productId: activeProduct.id,
			createdAt: Date.now()
		});
		window.localStorage.setItem("drippass.lookbook", JSON.stringify(savedLooks));
		setSaved(true);
		toast.success("Look saved to your account!");
	};
	const shareLook = async () => {
		const shareData = {
			title: activeProduct?.title ?? "DRIPPASS look",
			text: "Try this look on DRIPPASS",
			url: window.location.href
		};
		if (navigator.share) try {
			await navigator.share(shareData);
			return;
		} catch (error) {
			if (error instanceof DOMException && error.name === "AbortError") return;
		}
		try {
			await navigator.clipboard.writeText(window.location.href);
			toast.success("Look link copied to clipboard!");
		} catch {
			toast.error("Sharing is unavailable. Copy the page URL from your browser.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex min-h-[720px] flex-col overflow-hidden border border-border bg-card shadow-soft",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-between border-b border-border bg-gradient-luxe px-4 py-3 text-primary-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-base leading-tight",
					children: "AI Visual Try-On Studio"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] tracking-luxe opacity-70",
					children: "FITTING ROOM & STYLIST"
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 space-y-5 overflow-y-auto p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-[10px] tracking-luxe text-muted-foreground",
							children: "STEP 1 — YOUR PHOTO"
						}),
						!activeProduct ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border border-border bg-muted/30 p-5 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm",
								children: "Pick an outfit from the catalog to try it on."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								className: "mt-3 rounded-none",
								onClick: () => setPickerOpen(true),
								children: "Pick a garment"
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex items-center gap-3 border border-border bg-card p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: activeProduct.image,
									alt: activeProduct.title,
									className: "size-16 object-cover"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-sm font-medium",
											children: activeProduct.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground",
											children: [
												activeProduct.designer,
												" · ₹",
												activeProduct.perDay,
												"/day"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[11px] text-muted-foreground",
											children: ["Sizes: ", activeProduct.sizes.join(", ")]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									className: "rounded-none",
									onClick: () => setPickerOpen(true),
									children: "Change garment"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "h-auto flex-col gap-1 rounded-none py-3",
								onClick: () => fileRef.current?.click(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px]",
									children: "Upload Photo"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "h-auto flex-col gap-1 rounded-none py-3",
								onClick: () => toast("Camera feed requested — allow access in your browser"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px]",
									children: "Use Camera"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 border border-dashed border-border p-3 text-center text-[11px] text-muted-foreground",
							onDragOver: (event) => event.preventDefault(),
							onDrop: (event) => {
								event.preventDefault();
								handleFile(event.dataTransfer.files[0]);
							},
							children: "Drag and drop a JPEG, PNG, or WEBP photo here, or use the upload button."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileRef,
							type: "file",
							accept: "image/*",
							hidden: true,
							onChange: (e) => handleFile(e.target.files?.[0])
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex items-center justify-between rounded-none border border-border px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								htmlFor: "privacy",
								className: "flex items-center gap-2 text-[11px] font-normal",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5 text-gold" }), " Photos stored locally on device"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								id: "privacy",
								checked: localOnly,
								onCheckedChange: setLocalOnly
							})]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-[10px] tracking-luxe text-muted-foreground",
							children: "STEP 2 — INSTANT FIT PREVIEW"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-[3/4] overflow-hidden border border-border bg-muted",
							children: [userPhoto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: userPhoto,
								alt: "Your uploaded try-on photo",
								className: "h-full w-full object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-full place-items-center px-6 text-center text-xs text-muted-foreground",
								children: "Upload a full-body photo to render your fit preview"
							}), activeProduct && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-x-0 bottom-0 bg-background/90 px-3 py-2 backdrop-blur",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-[11px] font-medium",
									children: activeProduct.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground",
									children: activeProduct.designer
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border border-border bg-background p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] tracking-luxe text-muted-foreground",
											children: "CHATGPT IMAGES"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											variant: "outline",
											size: "sm",
											className: "h-8 gap-1 rounded-none text-[10px]",
											disabled: !consent || !activeProduct,
											onClick: copyPrompt,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3" }),
												" ",
												copied ? "Copied" : "Copy prompt"
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 line-clamp-3 text-[11px] leading-relaxed text-muted-foreground",
										children: prompt
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-2 border border-border p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
										id: "try-on-consent",
										checked: consent,
										onCheckedChange: (checked) => setConsent(checked === true)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "try-on-consent",
										className: "text-[11px] font-normal leading-relaxed",
										children: "I consent to this photo being used for one try-on generation in ChatGPT Images."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									onClick: runTryOn,
									disabled: !userPhoto || !activeProduct || !consent || generating,
									className: "w-full rounded-none bg-gradient-neon text-foreground",
									children: generating ? "Preparing ChatGPT Images…" : copied ? "Prompt copied · ChatGPT Images opened" : "Generate try-on"
								})
							]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-[10px] tracking-luxe text-muted-foreground",
							children: "STEP 3 — ASK AI STYLIST"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [messages.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: m.role === "user" ? "ml-auto w-fit max-w-[85%] bg-foreground px-3 py-2 text-xs text-background" : "max-w-[95%] text-xs leading-relaxed text-foreground",
								children: m.text
							}, i)), pending && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-2 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3 animate-spin" }), " Styling your look…"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-1.5",
							children: QUICK_PROMPTS.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => ask(q),
								className: "border border-border px-2 py-1 text-[10px] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground",
								children: q
							}, q))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: (e) => {
								e.preventDefault();
								ask(input);
							},
							className: "mt-3 flex items-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: input,
								onChange: (e) => setInput(e.target.value),
								onKeyDown: (e) => {
									if (e.key === "Enter" && !e.shiftKey) {
										e.preventDefault();
										ask(input);
									}
								},
								rows: 2,
								placeholder: "Ask AI Stylist…",
								className: "min-h-0 resize-none rounded-none text-xs"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								size: "icon",
								disabled: pending,
								className: "rounded-none bg-gradient-neon text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })
							})]
						})
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 border-t border-border p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: onRent,
						disabled: !activeProduct,
						className: "w-full gap-2 rounded-none bg-gradient-neon text-foreground hover:opacity-90",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "size-4" }), " Rent This Outfit"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: () => {
								saveCurrentLook();
								onSave({
									photo: userPhoto,
									fit: 55,
									pose: 2
								});
							},
							disabled: !activeProduct,
							className: "gap-1.5 rounded-none text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-3.5" }),
								" ",
								saved ? "Saved ♥" : "Save Look"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: shareLook,
							className: "gap-1.5 rounded-none text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "size-3.5" }), " Share Look"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center justify-center gap-1 text-[10px] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3" }), " Powered by DRIPPASS AI"]
					})
				]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: pickerOpen,
		onOpenChange: setPickerOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "rounded-none sm:max-w-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Choose a garment" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid max-h-[60vh] grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-3",
				children: PRODUCTS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						setActiveProduct(item);
						setPickerOpen(false);
					},
					className: `border p-2 text-left ${activeProduct?.id === item.id ? "border-foreground" : "border-border"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.image,
							alt: item.title,
							className: "aspect-[3/4] w-full object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 truncate text-xs font-medium",
							children: item.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] text-muted-foreground",
							children: item.designer
						})
					]
				}, item.id))
			})]
		})
	})] });
}
function TryOnPage() {
	const { product: productSlug } = Route$2.useSearch();
	const product = getProductBySlug(productSlug ?? "") ?? PRODUCTS[0] ?? null;
	const [copied, setCopied] = (0, import_react.useState)(false);
	const prompt = buildTryOnPrompt(product?.title ?? "[INSERT GARMENT NAME]", product?.designer ?? "[INSERT BRAND NAME]");
	const copyPrompt = async () => {
		try {
			await navigator.clipboard.writeText(prompt);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1800);
			window.open("https://chatgpt.com/images", "_blank", "noopener,noreferrer");
			toast.success("Prompt copied to clipboard! Paste it directly into ChatGPT Images.");
		} catch {
			toast.error("Could not copy the prompt. Select the text and open ChatGPT Images manually.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-background px-4 py-10 pb-32 md:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-luxe text-muted-foreground",
					children: "DRIPPASS STUDIO"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl md:text-6xl",
					children: "Try the look on."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-xl text-sm text-muted-foreground",
					children: "Upload a photo only when you are ready. Prepare your images and prompt here, then finish the try-on in ChatGPT Images."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mb-6 border border-border bg-card p-5 shadow-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs tracking-luxe text-muted-foreground",
										children: "CHATGPT IMAGES"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-2 font-display text-2xl",
										children: "Bring your context with you."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 max-w-2xl text-xs text-muted-foreground",
										children: "Copy this person-specific prompt, open ChatGPT Images in a new tab, and attach your photo and garment reference there."
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									className: "gap-2 rounded-none bg-gradient-neon text-foreground",
									onClick: copyPrompt,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }),
										" ",
										copied ? "Copied · ChatGPT opened" : "Copy prompt & open ChatGPT Images"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								readOnly: true,
								value: prompt,
								"aria-label": "Copyable ChatGPT Images try-on prompt",
								className: "mt-4 min-h-28 w-full resize-y border border-border bg-background p-3 text-xs leading-relaxed outline-none"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "https://chatgpt.com/images",
								target: "_blank",
								rel: "noreferrer",
								className: "mt-3 inline-flex items-center gap-2 text-xs underline",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" }), " Open ChatGPT Images"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AIStudio, {
						product,
						onRent: () => {
							if (product) window.location.assign(`/rent/${product.slug}`);
						},
						onSave: () => void 0
					})]
				})
			]
		})
	});
}
//#endregion
export { TryOnPage as component };
