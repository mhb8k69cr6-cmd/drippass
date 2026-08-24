import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { N as Check, t as X } from "../_libs/lucide-react.mjs";
import { r as cn } from "./button-PwNqyxv_.mjs";
import { t as supabase } from "./supabase-DHkNjKmq.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Root } from "../_libs/radix-ui__react-separator.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lookbook-C2GCr3vD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: cn("grid place-content-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
var Separator = import_react.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	decorative,
	orientation,
	className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className),
	...props
}));
Separator.displayName = Root.displayName;
function useLookbook() {
	const [wishlist, setWishlist] = (0, import_react.useState)([]);
	const [looks, setLooks] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const client = supabase;
		if (!client) return;
		let active = true;
		const load = async () => {
			const { data: auth } = await client.auth.getUser();
			if (!auth.user) return;
			const [{ data: wishlistRows }, { data: lookRows }] = await Promise.all([client.from("wishlist_items").select("product_id").eq("user_id", auth.user.id), client.from("lookbook_entries").select("*").eq("user_id", auth.user.id).order("created_at", { ascending: false })]);
			if (!active) return;
			setWishlist((wishlistRows ?? []).map((row) => String(row.product_id)));
			setLooks((lookRows ?? []).map((row) => ({
				id: String(row.id),
				productId: String(row.product_id),
				title: String(row.title),
				designer: String(row.designer),
				category: String(row.category),
				image: String(row.original_product_image_url ?? row.generated_image_url),
				photo: null,
				fit: 55,
				pose: 2,
				...row.caption ? { caption: String(row.caption) } : {},
				createdAt: new Date(String(row.created_at)).getTime()
			})));
		};
		load();
		const { data } = client.auth.onAuthStateChange(() => void load());
		return () => {
			active = false;
			data.subscription.unsubscribe();
		};
	}, []);
	return {
		wishlist,
		toggleWishlist: (0, import_react.useCallback)((id) => {
			setWishlist((s) => {
				const exists = s.includes(id);
				const client = supabase;
				if (client) client.auth.getUser().then(({ data }) => {
					if (!data.user) return;
					if (exists) client.from("wishlist_items").delete().eq("user_id", data.user.id).eq("product_id", id);
					else client.from("wishlist_items").insert({
						user_id: data.user.id,
						product_id: id
					});
				});
				return exists ? s.filter((x) => x !== id) : [...s, id];
			});
		}, []),
		looks,
		saveLook: (0, import_react.useCallback)(async (look) => {
			const client = supabase;
			if (!client) throw new Error("Lookbook storage is not configured.");
			const { data: auth } = await client.auth.getUser();
			if (!auth.user) throw new Error("Log in to save a look to your lookbook.");
			const entry = {
				...look,
				id: crypto.randomUUID(),
				createdAt: Date.now()
			};
			const { error } = await client.from("lookbook_entries").insert({
				id: entry.id,
				user_id: auth.user.id,
				product_id: entry.productId,
				generated_image_url: entry.image,
				original_product_image_url: entry.image,
				title: entry.title,
				designer: entry.designer,
				category: entry.category
			});
			if (error) throw new Error(`The look could not be saved to your lookbook: ${error.message}`);
			setLooks((l) => [entry, ...l]);
			return entry;
		}, []),
		removeLook: (0, import_react.useCallback)((id) => {
			setLooks((l) => l.filter((x) => x.id !== id));
			if (supabase) supabase.from("lookbook_entries").delete().eq("id", id);
		}, []),
		setCaption: (0, import_react.useCallback)((id, caption) => {
			setLooks((l) => l.map((x) => x.id === id ? {
				...x,
				caption
			} : x));
			if (supabase) supabase.from("lookbook_entries").update({ caption }).eq("id", id);
		}, [])
	};
}
//#endregion
export { DialogFooter as a, Separator as c, DialogDescription as i, useLookbook as l, Dialog as n, DialogHeader as o, DialogContent as r, DialogTitle as s, Checkbox as t };
