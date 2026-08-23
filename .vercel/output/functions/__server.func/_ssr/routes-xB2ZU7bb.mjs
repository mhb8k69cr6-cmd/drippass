import { i as __toESM } from "../_runtime.mjs";
import { a as EVENTS, c as SIZES, i as DURATIONS, n as BRANDS, r as CATEGORIES, s as PRODUCTS, t as BANNERS } from "./products-sweX_gG3.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Trigger2, i as Root2, n as Header, r as Item, t as Content2, v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { A as ChevronLeft, C as Heart, D as Circle, E as Copy, M as Check, O as ChevronUp, P as Calendar$1, S as Instagram, _ as Mic, a as Trash2, b as LoaderCircle, c as Sparkles, d as ShieldCheck, g as Music2, h as Package, i as Truck, j as ChevronDown, k as ChevronRight, l as SlidersHorizontal, m as PanelTopOpen, n as User, o as Tag, p as Search, s as Star, t as X, u as ShoppingBag, v as MapPin, y as LocateFixed } from "../_libs/lucide-react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as buttonVariants, r as cn, t as Button } from "./button-PwNqyxv_.mjs";
import { t as Badge } from "./badge-B3f60TId.mjs";
import { t as Input } from "./input-uzm9g8Y7.mjs";
import { a as DialogOverlay, c as DialogTrigger, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent$1, o as DialogTitle$1, r as DialogDescription$1, t as Dialog$1 } from "./dialog-BA-nrckz.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { n as createServerFn } from "./server-Bk9SKquM.mjs";
import { n as objectType, r as stringType, t as enumType } from "../_libs/zod.mjs";
import { t as Label } from "./label-BeT0bXvu.mjs";
import { t as supabase } from "./supabase-BRX17_oZ.mjs";
import { t as ProductCard } from "./ProductCard-CAmkswNR.mjs";
import { i as useServerFn, n as Separator, r as createSsrRpc, t as Checkbox } from "./createSsrRpc-DXacJ_2e.mjs";
import { a as Label2, c as Root2$1, d as SubTrigger2, f as Trigger, i as ItemIndicator2, l as Separator2, n as Content2$1, o as Portal2, r as Item2, s as RadioItem2, t as CheckboxItem2, u as SubContent2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { a as SelectItemIndicator, c as SelectPortal, d as SelectSeparator$1, f as SelectTrigger$1, i as SelectItem$1, l as SelectScrollDownButton$1, m as SelectViewport, n as SelectContent$1, o as SelectItemText, p as SelectValue$1, r as SelectIcon, s as SelectLabel$1, t as Select$1, u as SelectScrollUpButton$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/radix-ui__react-slider.mjs";
import { N as addDays, O as differenceInCalendarDays, l as format } from "../_libs/date-fns.mjs";
import { n as getDefaultClassNames, t as DayPicker } from "../_libs/react-day-picker.mjs";
import { i as Trigger$1, n as Portal, r as Root2$2, t as Content2$2 } from "../_libs/radix-ui__react-popover.mjs";
import { i as Trigger$2, n as List, r as Root2$3, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-xB2ZU7bb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectSeparator$1.displayName;
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var DropdownMenu = Root2$1;
var DropdownMenuTrigger = Trigger;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubTrigger2, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent2, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = SubContent2.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2$1, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2$1.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuRadioItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = Label2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
var LOGO_SRC = "/drippass-logo.png";
var frameStyles = {
	header: "h-14 w-[240px] md:h-16 md:w-[300px]",
	menu: "h-12 w-[220px]",
	footer: "h-16 w-[280px] md:h-[4.5rem] md:w-[320px]"
};
function DrippassLogo({ variant = "header", className, alt = "DRIPPASS — Wear. Return. Repeat." }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("relative block shrink-0 overflow-hidden", frameStyles[variant], className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: LOGO_SRC,
			alt,
			className: "absolute left-1/2 top-1/2 h-[360%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2"
		})
	});
}
var SUGGESTED_LOCATIONS = [
	"110001, Delhi",
	"560001, Bengaluru",
	"400001, Mumbai",
	"700001, Kolkata",
	"600001, Chennai"
];
var MAP_POINTS = [
	{
		label: "Central",
		top: "28%",
		left: "42%"
	},
	{
		label: "North",
		top: "34%",
		left: "67%"
	},
	{
		label: "West",
		top: "55%",
		left: "28%"
	},
	{
		label: "South",
		top: "72%",
		left: "58%"
	}
];
function LocationPickerDialog({ open, onOpenChange, onLocationSelect, initialLocation }) {
	const [input, setInput] = (0, import_react.useState)(initialLocation ?? "");
	const [detecting, setDetecting] = (0, import_react.useState)(false);
	const previewLocation = (0, import_react.useMemo)(() => input.trim() || "Delhi NCR", [input]);
	const confirm = () => {
		const trimmed = input.trim();
		if (!trimmed) {
			toast.error("Please enter a location");
			return;
		}
		onLocationSelect(trimmed);
		onOpenChange(false);
		toast.success(`Availability checked for ${trimmed}`);
	};
	const detectLocation = () => {
		if (!navigator.geolocation) {
			toast.error("Location detection is not supported in this browser.");
			return;
		}
		setDetecting(true);
		navigator.geolocation.getCurrentPosition((position) => {
			setDetecting(false);
			setInput(`${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`);
			toast.success("Location detected. Confirm it to update availability.");
		}, () => {
			setDetecting(false);
			toast.error("Location permission was denied. Enter a PIN code instead.");
		}, {
			maximumAge: 3e5,
			timeout: 5e3
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
			className: "max-w-lg rounded-none",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, { children: "Set your delivery location" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, { children: "Choose a city or pin a nearby zone to see what’s available in your area." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: input,
								onChange: (event) => setInput(event.target.value),
								placeholder: "Enter your location or PIN code"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "outline",
								className: "gap-2",
								onClick: detectLocation,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocateFixed, { className: "size-4" }),
									" ",
									detecting ? "Detecting…" : "Detect my location"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-none border border-border bg-muted/40 p-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative h-48 overflow-hidden rounded-none border border-border bg-[radial-gradient(circle_at_top_left,_rgba(255,199,76,0.3),_transparent_35%),linear-gradient(135deg,_#f8f8f8_0%,_#ececec_100%)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:24px_24px]" }), MAP_POINTS.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full border border-gold bg-background/90 px-2 py-1 text-[10px] shadow-sm",
									style: {
										top: point.top,
										left: point.left
									},
									onClick: () => setInput(`${point.label} Zone, Delhi NCR`),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3 text-gold" }),
										" ",
										point.label
									]
								}, point.label))]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: SUGGESTED_LOCATIONS.map((location) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "rounded-full border border-border px-3 py-1 text-xs hover:bg-muted",
								onClick: () => setInput(location),
								children: location
							}, location))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-none border border-border bg-background p-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: "Preview"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-muted-foreground",
								children: [
									"Availability will be checked for ",
									previewLocation,
									"."
								]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => onOpenChange(false),
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: confirm,
					children: "Check availability"
				})] })
			]
		})
	});
}
var SUGGESTIONS = [
	"sequin dress for club night",
	"ivory tuxedo gala",
	"oversized leather jacket",
	"silk gown wedding guest"
];
var PLACEHOLDERS = [
	"Search tuxedos for weddings…",
	"Search Sabyasachi…",
	"Search a look for your next event…"
];
function SiteHeader({ cartCount, wishlistCount, activeCategory, onCategory, onOpenCart, onOpenWishlist, onOpenLookbook, onSearch, onLogin, onManagePass, onReturnPickups, userName, location, onLocationChange }) {
	const [query, setQuery] = (0, import_react.useState)("");
	const [focused, setFocused] = (0, import_react.useState)(false);
	const [locationOpen, setLocationOpen] = (0, import_react.useState)(false);
	const [collapsed, setCollapsed] = (0, import_react.useState)(false);
	useNavigate();
	const [listening, setListening] = (0, import_react.useState)(false);
	const [voiceOpen, setVoiceOpen] = (0, import_react.useState)(false);
	const [placeholderIndex, setPlaceholderIndex] = (0, import_react.useState)(0);
	const [highlighted, setHighlighted] = (0, import_react.useState)(0);
	const searchInputRef = (0, import_react.useRef)(null);
	const searchTimerRef = (0, import_react.useRef)(null);
	const recognitionRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (location) window.localStorage.setItem("drippass.location", location);
	}, [location]);
	(0, import_react.useEffect)(() => {
		if (sessionStorage.getItem("drippass-location-requested") || !navigator.geolocation) return;
		sessionStorage.setItem("drippass-location-requested", "true");
		navigator.geolocation.getCurrentPosition((position) => onLocationChange?.(`${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`), () => void 0, {
			maximumAge: 3e5,
			timeout: 5e3
		});
	}, [onLocationChange]);
	(0, import_react.useEffect)(() => () => recognitionRef.current?.stop(), []);
	(0, import_react.useEffect)(() => {
		const timer = window.setInterval(() => setPlaceholderIndex((index) => (index + 1) % PLACEHOLDERS.length), 3200);
		return () => window.clearInterval(timer);
	}, []);
	const matches = (0, import_react.useMemo)(() => {
		const normalized = query.trim().toLowerCase();
		const items = PRODUCTS.filter((product) => !normalized || `${product.title} ${product.designer} ${product.category} ${product.event}`.toLowerCase().includes(normalized)).slice(0, 5);
		return {
			trending: normalized ? [] : SUGGESTIONS,
			designers: [...new Set(items.map((product) => product.designer))],
			categories: [...new Set(items.map((product) => product.category))],
			products: items
		};
	}, [query]);
	const searchOptions = [
		...matches.trending.map((value) => ({
			value,
			label: value
		})),
		...matches.designers.map((value) => ({
			value,
			label: value
		})),
		...matches.categories.map((value) => ({
			value,
			label: value
		})),
		...matches.products.map((product) => ({
			value: product.title,
			label: product.title
		}))
	];
	const groupStarts = [
		{
			title: "Trending searches",
			count: matches.trending.length
		},
		{
			title: "Designers",
			count: matches.designers.length
		},
		{
			title: "Categories",
			count: matches.categories.length
		},
		{
			title: "Direct item matches",
			count: matches.products.length
		}
	];
	const submitSearch = () => {
		const trimmed = query.trim();
		onSearch(trimmed);
		setFocused(false);
		if (trimmed) toast.success(`Showing results for "${trimmed}"`);
		else toast("Showing all fits");
	};
	const startVoiceSearch = () => {
		const SpeechRecognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;
		if (!SpeechRecognition) {
			toast.error("Voice search is not supported in this browser.");
			return;
		}
		const recognition = new SpeechRecognition();
		recognition.lang = "en-IN";
		recognition.interimResults = false;
		recognition.maxAlternatives = 1;
		recognition.onresult = (event) => {
			const transcript = event.results[0]?.[0]?.transcript.trim() ?? "";
			setQuery(transcript);
			if (transcript) {
				onSearch(transcript);
				setVoiceOpen(false);
			} else toast.error("No speech detected. Try again.");
		};
		recognition.onerror = (event) => toast.error(event.error === "not-allowed" ? "Microphone permission was denied." : "Voice search could not hear that.");
		recognition.onend = () => setListening(false);
		recognitionRef.current = recognition;
		setListening(true);
		setVoiceOpen(true);
		try {
			recognition.start();
		} catch {
			setListening(false);
			toast.error("Voice search is already active.");
		}
	};
	const updateQuery = (value) => {
		setQuery(value);
		setHighlighted(0);
		if (searchTimerRef.current) window.clearTimeout(searchTimerRef.current);
		searchTimerRef.current = window.setTimeout(() => onSearch(value), 280);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-gradient-luxe px-4 py-1.5 text-center text-[11px] tracking-luxe text-primary-foreground",
				children: "FREE PREPAID RETURN BAG · SANITIZED BEFORE EVERY DROP"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-[1600px] items-center gap-3 px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "shrink-0 leading-none",
						"aria-label": "DRIPPASS home",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrippassLogo, { variant: "header" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "icon",
						className: "ml-auto size-9",
						"aria-label": collapsed ? "Expand navigation bar" : "Minimize navigation bar",
						title: collapsed ? "Expand navigation bar" : "Minimize navigation bar",
						onClick: () => setCollapsed((value) => !value),
						children: collapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelTopOpen, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					}),
					!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setLocationOpen(true),
							className: "hidden items-center gap-2 rounded-sm border border-border px-3 py-2 text-left text-xs hover:bg-muted md:flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-muted-foreground",
								children: location ? `Deliver to ${location}` : "Set your location"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: "Check availability"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex-1",
							role: "search",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center overflow-hidden rounded-sm border border-foreground/20 bg-card focus-within:border-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										ref: searchInputRef,
										value: query,
										onChange: (e) => updateQuery(e.target.value),
										onFocus: () => setFocused(true),
										onBlur: () => setTimeout(() => setFocused(false), 150),
										role: "combobox",
										"aria-haspopup": "listbox",
										"aria-expanded": focused,
										"aria-controls": "search-results",
										onKeyDown: (e) => {
											if (e.key === "ArrowDown") {
												e.preventDefault();
												setHighlighted((index) => Math.min(index + 1, Math.max(0, searchOptions.length - 1)));
											} else if (e.key === "ArrowUp") {
												e.preventDefault();
												setHighlighted((index) => Math.max(0, index - 1));
											} else if (e.key === "Escape") setFocused(false);
											else if (e.key === "Enter") {
												e.preventDefault();
												const option = searchOptions[highlighted];
												if (option) {
													updateQuery(option.value);
													onSearch(option.value);
													setFocused(false);
												} else submitSearch();
											}
										},
										placeholder: PLACEHOLDERS[placeholderIndex],
										className: "h-11 border-0 bg-transparent shadow-none focus-visible:ring-0"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: startVoiceSearch,
										className: `px-3 ${listening ? "text-destructive" : "text-muted-foreground hover:text-foreground"}`,
										"aria-label": "Voice search",
										title: listening ? "Listening" : "Voice search",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: `size-4 ${listening ? "animate-pulse" : ""}` })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: submitSearch,
										className: "flex h-11 items-center bg-gradient-neon px-5 text-foreground",
										"aria-label": "Search",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" })
									})
								]
							}), focused && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								id: "search-results",
								role: "listbox",
								"aria-label": "Search suggestions",
								className: "absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-sm border border-border bg-popover shadow-soft",
								children: [!searchOptions.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "px-4 py-3 text-xs text-muted-foreground",
									children: "No matching fits, designers, or categories."
								}), searchOptions.map((option, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [(() => {
									let offset = 0;
									const group = groupStarts.find((candidate) => {
										const startsAt = offset;
										offset += candidate.count;
										return candidate.count > 0 && index === startsAt;
									});
									return group ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "px-4 pb-1 pt-3 text-[10px] font-medium uppercase tracking-luxe text-muted-foreground",
										children: group.title
									}) : null;
								})(), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									role: "option",
									"aria-selected": highlighted === index,
									onMouseDown: () => {
										updateQuery(option.value);
										onSearch(option.value);
										setFocused(false);
										toast.success(`Showing results for "${option.value}"`);
									},
									className: `flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm hover:bg-muted ${highlighted === index ? "bg-muted" : ""}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-3.5 text-muted-foreground" }), option.label]
								})] }, `${option.value}-${index}`))]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								"aria-label": "Account",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
							align: "end",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuLabel, { children: ["Hey, ", userName ?? "Guest"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
								userName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
										onClick: onOpenWishlist,
										children: "My Wishlist"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
										onClick: onOpenLookbook,
										children: "My Lookbook"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
										onClick: onManagePass,
										children: "Manage Pass"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
										onClick: onReturnPickups,
										children: "Return Pickups"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
										onClick: onLogin,
										children: "Logout"
									})
								] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
									onClick: onLogin,
									children: "Login / Sign up"
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "icon",
							className: "relative",
							onClick: onOpenWishlist,
							"aria-label": "Saved outfits",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {}), wishlistCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -right-0.5 -top-0.5 rounded-full bg-foreground px-1.5 text-[10px] text-background",
								children: wishlistCount
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "icon",
							className: "relative",
							onClick: onOpenCart,
							"aria-label": "Rental cart",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {}), cartCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -right-0.5 -top-0.5 rounded-full bg-gold px-1.5 text-[10px] text-gold-foreground",
								children: cartCount
							})]
						})
					] })
				]
			}),
			!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocationPickerDialog, {
				open: locationOpen,
				onOpenChange: setLocationOpen,
				...location ? { initialLocation: location } : {},
				onLocationSelect: (selected) => {
					onLocationChange?.(selected);
					setLocationOpen(false);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
				open: voiceOpen,
				onOpenChange: (open) => {
					setVoiceOpen(open);
					if (!open) recognitionRef.current?.stop();
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
					className: "rounded-none sm:max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, { children: listening ? "Listening for your search" : "Voice search" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, { children: "Say a designer, garment, category, or event. Your words will be submitted when speech ends." })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-24 items-center justify-center gap-1 border border-border bg-muted/40",
							"aria-live": "polite",
							children: Array.from({ length: 18 }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `w-1 rounded-full bg-gold ${listening ? "animate-pulse" : "h-2"}`,
								style: listening ? {
									height: `${12 + index * 17 % 48}px`,
									animationDelay: `${index * 35}ms`
								} : void 0
							}, index))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							className: "rounded-none",
							onClick: () => {
								recognitionRef.current?.stop();
								setVoiceOpen(false);
							},
							children: "Cancel"
						})
					]
				})
			})
		]
	});
}
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
	ref,
	className: cn("relative flex w-full touch-none select-none items-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
		className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-primary" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })]
}));
Slider.displayName = Slider$1.displayName;
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
var DEFAULT_FILTERS = {
	categories: [],
	sizes: [],
	genders: [],
	events: [],
	duration: "7-day",
	brands: [],
	maxPerDay: 1500,
	availableOnly: false
};
function toggle(list, value) {
	return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}
function FilterSidebar({ filters, onChange }) {
	const set = (patch) => onChange({
		...filters,
		...patch
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg",
					children: "Filters"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: () => onChange(DEFAULT_FILTERS),
					children: "Clear all"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Accordion, {
				type: "multiple",
				defaultValue: [
					"cat",
					"size",
					"dur",
					"price"
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
						value: "cat",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
							className: "text-xs tracking-luxe",
							children: "CATEGORY"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
							className: "space-y-2.5",
							children: CATEGORIES.filter((c) => c !== "Subscription Plans").map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									id: `c-${c}`,
									checked: filters.categories.includes(c),
									onCheckedChange: () => set({ categories: toggle(filters.categories, c) })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: `c-${c}`,
									className: "text-sm font-normal",
									children: c
								})]
							}, c))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
						value: "size",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
							className: "text-xs tracking-luxe",
							children: "SIZE"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: SIZES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => set({ sizes: toggle(filters.sizes, s) }),
								className: `h-9 w-11 border text-xs transition-colors ${filters.sizes.includes(s) ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`,
								children: s
							}, s))
						}) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
						value: "gender",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
							className: "text-xs tracking-luxe",
							children: "GENDER"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
							className: "space-y-2.5",
							children: [
								"Women",
								"Men",
								"Unisex"
							].map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									id: `g-${g}`,
									checked: filters.genders.includes(g),
									onCheckedChange: () => set({ genders: toggle(filters.genders, g) })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: `g-${g}`,
									className: "text-sm font-normal",
									children: g
								})]
							}, g))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
						value: "event",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
							className: "text-xs tracking-luxe",
							children: "EVENT TYPE"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
							className: "space-y-2.5",
							children: EVENTS.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									id: `e-${e}`,
									checked: filters.events.includes(e),
									onCheckedChange: () => set({ events: toggle(filters.events, e) })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: `e-${e}`,
									className: "text-sm font-normal",
									children: e
								})]
							}, e))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
						value: "dur",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
							className: "text-xs tracking-luxe",
							children: "RENTAL DURATION"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-3 gap-2",
							children: DURATIONS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => set({ duration: d }),
								className: `border py-2 text-xs transition-colors ${filters.duration === d ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`,
								children: d
							}, d))
						}) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
						value: "brand",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
							className: "text-xs tracking-luxe",
							children: "BRAND"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
							className: "space-y-2.5",
							children: BRANDS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									id: `b-${b}`,
									checked: filters.brands.includes(b),
									onCheckedChange: () => set({ brands: toggle(filters.brands, b) })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: `b-${b}`,
									className: "text-sm font-normal",
									children: b
								})]
							}, b))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
						value: "price",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
							className: "text-xs tracking-luxe",
							children: "PRICE PER DAY"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionContent, {
							className: "pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								value: [filters.maxPerDay],
								min: 300,
								max: 1500,
								step: 50,
								onValueChange: (v) => set({ maxPerDay: v[0] ?? 1500 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-xs text-muted-foreground",
								children: [
									"Up to ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-medium text-foreground",
										children: ["₹", filters.maxPerDay]
									}),
									" / day"
								]
							})]
						})]
					})
				]
			})
		]
	});
}
function FilterBar({ filters, onChange }) {
	const brand = filters.brands[0] ?? "all";
	const availability = filters.availableOnly ? "available" : "all";
	const toggle = (values, value) => values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center gap-2 border-y border-border/60 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex max-w-full flex-wrap gap-1.5",
				children: CATEGORIES.filter((item) => item !== "Subscription Plans").map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onChange({
						...filters,
						categories: toggle(filters.categories, item)
					}),
					className: `rounded-none border px-2.5 py-2 text-[11px] ${filters.categories.includes(item) ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`,
					children: item
				}, item))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1.5",
				children: SIZES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onChange({
						...filters,
						sizes: toggle(filters.sizes, item)
					}),
					className: `h-9 w-9 border text-[11px] ${filters.sizes.includes(item) ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`,
					children: item
				}, item))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
				value: brand,
				onValueChange: (value) => onChange({
					...filters,
					brands: value === "all" ? [] : [value]
				}),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
					className: "h-9 w-36 rounded-none text-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Designer" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
					value: "all",
					children: "All designers"
				}), BRANDS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
					value: item,
					children: item
				}, item))] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
				value: availability,
				onValueChange: (value) => onChange({
					...filters,
					availableOnly: value === "available"
				}),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
					className: "h-9 w-32 rounded-none text-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Availability" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
					value: "all",
					children: "All availability"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
					value: "available",
					children: "In stock only"
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-36 items-center gap-2 px-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					value: [filters.maxPerDay],
					min: 300,
					max: 1500,
					step: 50,
					onValueChange: (value) => onChange({
						...filters,
						maxPerDay: value[0] ?? 1500
					}),
					"aria-label": "Maximum price per day"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "whitespace-nowrap text-[11px] text-muted-foreground",
					children: [
						"₹",
						filters.maxPerDay,
						"/day"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "sm",
				className: "rounded-none text-xs",
				onClick: () => onChange(DEFAULT_FILTERS),
				children: "Clear all"
			})
		]
	});
}
function Calendar({ className, classNames, showOutsideDays = true, captionLayout = "label", buttonVariant = "ghost", formatters, components, ...props }) {
	const defaultClassNames = getDefaultClassNames();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayPicker, {
		showOutsideDays,
		className: cn("bg-background group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent", String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`, String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`, className),
		captionLayout,
		formatters: {
			formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
			...formatters
		},
		classNames: {
			root: cn("w-fit", defaultClassNames.root),
			months: cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
			month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
			nav: cn("absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1", defaultClassNames.nav),
			button_previous: cn(buttonVariants({ variant: buttonVariant }), "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50", defaultClassNames.button_previous),
			button_next: cn(buttonVariants({ variant: buttonVariant }), "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50", defaultClassNames.button_next),
			month_caption: cn("flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)", defaultClassNames.month_caption),
			dropdowns: cn("flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium", defaultClassNames.dropdowns),
			dropdown_root: cn("has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border", defaultClassNames.dropdown_root),
			dropdown: cn("bg-popover absolute inset-0 opacity-0", defaultClassNames.dropdown),
			caption_label: cn("select-none font-medium", captionLayout === "label" ? "text-sm" : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5", defaultClassNames.caption_label),
			table: "w-full border-collapse",
			weekdays: cn("flex", defaultClassNames.weekdays),
			weekday: cn("text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal", defaultClassNames.weekday),
			week: cn("mt-2 flex w-full", defaultClassNames.week),
			week_number_header: cn("w-(--cell-size) select-none", defaultClassNames.week_number_header),
			week_number: cn("text-muted-foreground select-none text-[0.8rem]", defaultClassNames.week_number),
			day: cn("group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md", defaultClassNames.day),
			range_start: cn("bg-accent rounded-l-md", defaultClassNames.range_start),
			range_middle: cn("rounded-none", defaultClassNames.range_middle),
			range_end: cn("bg-accent rounded-r-md", defaultClassNames.range_end),
			today: cn("bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none", defaultClassNames.today),
			outside: cn("text-muted-foreground aria-selected:text-muted-foreground", defaultClassNames.outside),
			disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
			hidden: cn("invisible", defaultClassNames.hidden),
			...classNames
		},
		components: {
			Root: ({ className, rootRef, ...props }) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-slot": "calendar",
					ref: rootRef,
					className: cn(className),
					...props
				});
			},
			Chevron: ({ className, orientation, ...props }) => {
				if (orientation === "left") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
					className: cn("size-4", className),
					...props
				});
				if (orientation === "right") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
					className: cn("size-4", className),
					...props
				});
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
					className: cn("size-4", className),
					...props
				});
			},
			DayButton: CalendarDayButton,
			WeekNumber: ({ children, ...props }) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					...props,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-(--cell-size) items-center justify-center text-center",
						children
					})
				});
			},
			...components
		},
		...props
	});
}
function CalendarDayButton({ className, day, modifiers, ...props }) {
	const defaultClassNames = getDefaultClassNames();
	const ref = import_react.useRef(null);
	import_react.useEffect(() => {
		if (modifiers["focused"]) ref.current?.focus();
	}, [modifiers]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		ref,
		variant: "ghost",
		size: "icon",
		"data-day": day.date.toLocaleDateString(),
		"data-selected-single": modifiers["selected"] && !modifiers["range_start"] && !modifiers["range_end"] && !modifiers["range_middle"],
		"data-range-start": modifiers["range_start"],
		"data-range-end": modifiers["range_end"],
		"data-range-middle": modifiers["range_middle"],
		className: cn("data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-(--cell-size) flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70", defaultClassNames.day, className),
		...props
	});
}
var Popover = Root2$2;
var PopoverTrigger = Trigger$1;
var PopoverContent = import_react.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2$2, {
	ref,
	align,
	sideOffset,
	className: cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)", className),
	...props
}) }));
PopoverContent.displayName = Content2$2.displayName;
function ProductModal({ product, open, onOpenChange, onAddToCart, onTryOn }) {
	const [active, setActive] = (0, import_react.useState)(0);
	const [range, setRange] = (0, import_react.useState)({
		from: addDays(/* @__PURE__ */ new Date(), 3),
		to: addDays(/* @__PURE__ */ new Date(), 10)
	});
	const [size, setSize] = (0, import_react.useState)(null);
	if (!product) return null;
	const days = range?.from && range?.to ? Math.max(1, differenceInCalendarDays(range.to, range.from)) : 7;
	const rental = days * product.perDay;
	const deposit = Math.round(product.retail * .1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
			className: "max-h-[92vh] max-w-5xl overflow-y-auto rounded-none p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
				className: "sr-only",
				children: product.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-0 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-muted p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-[3/4] overflow-hidden bg-background",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: product.gallery[active],
							alt: `${product.title} angle ${active + 1}`,
							className: "h-full w-full object-cover"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex gap-2",
						children: product.gallery.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActive(i),
							className: cn("h-20 w-16 overflow-hidden border", i === active ? "border-foreground" : "border-transparent opacity-60"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: g,
								alt: `Angle ${i + 1}`,
								className: "h-full w-full object-cover"
							})
						}, i))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] tracking-luxe text-muted-foreground",
								children: product.designer
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl leading-tight",
								children: product.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-center gap-2 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-0.5 bg-foreground px-1.5 py-0.5 text-background",
										children: [
											product.rating,
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-2.5 fill-current" })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground",
										children: [product.reviews, " verified renters"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "outline",
										className: "rounded-none",
										children: product.event
									})
								]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground line-through",
							children: ["Retail ₹", product.retail.toLocaleString("en-IN")]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-3xl",
							children: [
								"₹",
								product.perDay,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-sans text-sm text-muted-foreground",
									children: " / day"
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-[10px] tracking-luxe text-muted-foreground",
							children: "SELECT SIZE"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: product.sizes.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSize(s),
								className: cn("h-9 w-11 border text-xs", size === s ? "border-foreground bg-foreground text-background" : "border-border"),
								children: s
							}, s))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-[10px] tracking-luxe text-muted-foreground",
							children: "RENTAL DATES"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "w-full justify-start gap-2 rounded-none font-normal",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar$1, { className: "size-4" }), range?.from && range?.to ? `${format(range.from, "d MMM")} → ${format(range.to, "d MMM")} · ${days} days` : "Pick your rental window"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
							className: "w-auto p-0",
							align: "start",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
								mode: "range",
								selected: range,
								onSelect: setRange,
								numberOfMonths: 1,
								disabled: { before: /* @__PURE__ */ new Date() },
								className: cn("p-3 pointer-events-auto")
							})
						})] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5 border border-border p-4 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground",
										children: [
											"Rental (",
											days,
											" days × ₹",
											product.perDay,
											")"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", rental.toLocaleString("en-IN")] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Refundable deposit"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", deposit.toLocaleString("en-IN")] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-2" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total today" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-display text-lg",
										children: ["₹", (rental + deposit).toLocaleString("en-IN")]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-gold" }), "Dry-cleaned & disinfected before delivery"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "size-4 text-gold" }), "Includes prepaid return bag & free pickup"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "flex-1 rounded-none bg-gradient-neon text-foreground hover:opacity-90",
								disabled: !product.available,
								onClick: () => onAddToCart(days),
								children: product.available ? "Add to Rental Cart" : "Waitlist unavailable"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "gap-1.5 rounded-none",
								onClick: onTryOn,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), " Try On"]
							})]
						})
					]
				})]
			})]
		})
	});
}
var SLOTS = [
	"Tomorrow · 9AM–12PM",
	"Tomorrow · 4PM–8PM",
	"Sat · 9AM–12PM",
	"Sat · 6PM–10PM"
];
function CartSheet({ open, onOpenChange, items, onRemove }) {
	const [slot, setSlot] = (0, import_react.useState)(SLOTS[0]);
	const [code, setCode] = (0, import_react.useState)("");
	const [discount, setDiscount] = (0, import_react.useState)(0);
	const [checkoutOpen, setCheckoutOpen] = (0, import_react.useState)(false);
	const [cardNumber, setCardNumber] = (0, import_react.useState)("");
	const [checkoutState, setCheckoutState] = (0, import_react.useState)("idle");
	const rental = items.reduce((s, i) => s + i.product.perDay * i.days, 0);
	const deposit = items.reduce((s, i) => s + Math.round(i.product.retail * .1), 0);
	const total = Math.max(0, rental - discount) + deposit;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		open,
		onOpenChange,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			className: "flex w-full flex-col gap-0 sm:max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
					className: "border-b border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetTitle, {
						className: "font-display text-xl",
						children: [
							"Rental Cart (",
							items.length,
							")"
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 space-y-4 overflow-y-auto p-4",
					children: [
						items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "pt-10 text-center text-sm text-muted-foreground",
							children: "Your rack is empty. Add a fit to start the rotation."
						}),
						items.map(({ product, days }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 border border-border p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: product.image,
									alt: product.title,
									className: "h-24 w-20 object-cover"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] tracking-luxe text-muted-foreground",
											children: product.designer
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium leading-snug",
											children: product.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 text-xs text-muted-foreground",
											children: [days, "-day rental"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 font-display text-lg",
											children: ["₹", (product.perDay * days).toLocaleString("en-IN")]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => onRemove(product.id),
									"aria-label": "Remove",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-muted-foreground hover:text-destructive" })
								})
							]
						}, product.id)),
						items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mb-2 flex items-center gap-1.5 text-[10px] tracking-luxe text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "size-3.5" }), " DELIVERY SLOT"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: slot,
							onValueChange: setSlot,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "rounded-none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: SLOTS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: s,
								children: s
							}, s)) })]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mb-2 flex items-center gap-1.5 text-[10px] tracking-luxe text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "size-3.5" }), " SUBSCRIPTION PASS DISCOUNT"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: code,
								onChange: (e) => setCode(e.target.value),
								placeholder: "GOLDPASS",
								className: "rounded-none"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								className: "rounded-none",
								onClick: () => {
									if (code.trim().toUpperCase() === "GOLDPASS") {
										setDiscount(Math.round(rental * .25));
										toast.success("Gold Pass applied — 25% off rental");
									} else toast.error("Invalid pass code");
								},
								children: "Apply"
							})]
						})] })] })
					]
				}),
				items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 border-t border-border p-4 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Rental subtotal"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", rental.toLocaleString("en-IN")] })]
						}),
						discount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-gold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pass discount" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["−₹", discount.toLocaleString("en-IN")] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Refundable security deposit"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", deposit.toLocaleString("en-IN")] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-display text-xl",
								children: ["₹", total.toLocaleString("en-IN")]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-1.5 text-[11px] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5 text-gold" }), " Sanitized, insured & prepaid return bag included"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full rounded-none bg-gradient-neon text-foreground hover:opacity-90",
							onClick: () => setCheckoutOpen(true),
							children: "Proceed to Checkout"
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
			open: checkoutOpen,
			onOpenChange: setCheckoutOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
				className: "rounded-none sm:max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, { children: "Sandbox checkout" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, { children: "This is a payment walkthrough only. No card network, payment processor, or order database is contacted." })] }), checkoutState === "success" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-border p-4 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: "Sandbox payment approved"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-muted-foreground",
						children: "No real payment was taken and no rental order was created."
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "space-y-4",
					onSubmit: (event) => {
						event.preventDefault();
						setCheckoutState("processing");
						window.setTimeout(() => setCheckoutState(cardNumber.replace(/\s/g, "").endsWith("0002") ? "declined" : "success"), 700);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "sandbox-card",
								className: "text-xs",
								children: "Card number"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "sandbox-card",
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
									htmlFor: "sandbox-expiry",
									className: "text-xs",
									children: "Expiry"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "sandbox-expiry",
									required: true,
									placeholder: "12/30"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "sandbox-cvc",
									className: "text-xs",
									children: "CVC"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "sandbox-cvc",
									required: true,
									inputMode: "numeric",
									placeholder: "123"
								})]
							})]
						}),
						checkoutState === "declined" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-destructive",
							children: "Sandbox decline: use another test card number."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: checkoutState === "processing",
							className: "rounded-none bg-gradient-neon text-foreground",
							children: checkoutState === "processing" ? "Processing…" : "Run sandbox payment"
						}) })
					]
				})]
			})
		})]
	});
}
var Tabs = Root2$3;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger$2, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger$2.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
var CaptionInput = objectType({
	outfit: stringType().min(1).max(200),
	platform: enumType(["instagram", "tiktok"]),
	vibe: stringType().max(120).optional()
});
var generateCaption = createServerFn({ method: "POST" }).validator((data) => CaptionInput.parse(data)).handler(createSsrRpc("0256f1d9b6827f7d75fcf86b8099efe92a7cad43c1180135f2bf345903705c65"));
function LookbookSheet({ open, onOpenChange, tab, onTabChange, wishlist, looks, onToggleWishlist, onRemoveLook, onCaption, onOpenProduct }) {
	const [pendingId, setPendingId] = (0, import_react.useState)(null);
	const makeCaption = useServerFn(generateCaption);
	const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));
	const runCaption = async (look, platform) => {
		setPendingId(look.id + platform);
		try {
			const res = await makeCaption({ data: {
				outfit: `${look.title} by ${look.designer} (${look.category})`,
				platform
			} });
			onCaption(look.id, res.caption);
			toast.success(`${platform === "instagram" ? "Instagram" : "TikTok"} caption ready`);
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Caption failed");
		} finally {
			setPendingId(null);
		}
	};
	const copy = async (text) => {
		try {
			await navigator.clipboard.writeText(text);
			toast.success("Caption copied");
		} catch {
			toast.error("Couldn't copy — select the text manually");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			side: "right",
			className: "flex w-full flex-col gap-0 p-0 sm:max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
				className: "border-b border-border bg-gradient-luxe px-5 py-4 text-primary-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
					className: "font-display text-lg text-primary-foreground",
					children: "My Account"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] tracking-luxe opacity-70",
					children: "WISHLIST & AI LOOKBOOK"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				value: tab,
				onValueChange: onTabChange,
				className: "flex min-h-0 flex-1 flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "m-4 grid grid-cols-2 rounded-none bg-muted p-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "wishlist",
							className: "rounded-none text-xs",
							children: [
								"Wishlist (",
								savedProducts.length,
								")"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "lookbook",
							className: "rounded-none text-xs",
							children: [
								"Lookbook (",
								looks.length,
								")"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "wishlist",
						className: "mt-0 flex-1 overflow-y-auto px-4 pb-6",
						children: savedProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-16 text-center text-sm text-muted-foreground",
							children: "Nothing saved yet — tap the heart on any fit."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: savedProducts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3 border border-border bg-card p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: p.image,
									alt: p.title,
									className: "h-24 w-20 shrink-0 object-cover",
									loading: "lazy"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] tracking-luxe text-muted-foreground",
											children: p.designer
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-sm font-medium",
											children: p.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-display text-lg",
											children: [
												"₹",
												p.perDay,
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-sans text-[11px] text-muted-foreground",
													children: " / day"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-1.5 flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												className: "h-7 rounded-none bg-gradient-neon text-[11px] text-foreground",
												onClick: () => onOpenProduct(p),
												children: "Rent now"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												size: "sm",
												variant: "outline",
												className: "h-7 gap-1 rounded-none text-[11px]",
												onClick: () => onToggleWishlist(p.id),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-3 fill-current" }), " Remove"]
											})]
										})
									]
								})]
							}, p.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "lookbook",
						className: "mt-0 flex-1 overflow-y-auto px-4 pb-6",
						children: looks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-16 text-center text-sm text-muted-foreground",
							children: "No looks yet — style a fit in the AI Studio and hit “Save Look”."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: looks.map((look) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border border-border bg-card",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-3 p-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative h-28 w-24 shrink-0 overflow-hidden bg-muted",
												children: [look.photo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: look.photo,
													alt: "Try-on base",
													className: "h-full w-full object-cover"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: look.image,
													alt: look.title,
													className: "absolute inset-0 h-full w-full object-cover mix-blend-multiply",
													style: { opacity: look.photo ? look.fit / 100 : 1 }
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0 flex-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[10px] tracking-luxe text-muted-foreground",
														children: look.designer
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "truncate text-sm font-medium",
														children: look.title
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "mt-1 flex flex-wrap gap-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
															variant: "outline",
															className: "rounded-none text-[10px]",
															children: [
																"Fit ",
																look.fit,
																"%"
															]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
															variant: "outline",
															className: "rounded-none text-[10px]",
															children: ["Pose ", look.pose]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "mt-1 text-[10px] text-muted-foreground",
														children: ["Saved ", new Date(look.createdAt).toLocaleDateString("en-IN")]
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => onRemoveLook(look.id),
												"aria-label": "Delete look",
												className: "h-fit p-1 text-muted-foreground hover:text-destructive",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2 p-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "flex items-center gap-1 text-[10px] tracking-luxe text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3" }), " AI SOCIAL CAPTION"]
											}),
											look.caption && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "whitespace-pre-line border border-border bg-muted/50 p-2 text-xs leading-relaxed",
												children: look.caption
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
														size: "sm",
														variant: "outline",
														disabled: pendingId !== null,
														className: "h-7 gap-1 rounded-none text-[11px]",
														onClick: () => runCaption(look, "instagram"),
														children: [pendingId === look.id + "instagram" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "size-3" }), "Instagram"]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
														size: "sm",
														variant: "outline",
														disabled: pendingId !== null,
														className: "h-7 gap-1 rounded-none text-[11px]",
														onClick: () => runCaption(look, "tiktok"),
														children: [pendingId === look.id + "tiktok" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music2, { className: "size-3" }), "TikTok"]
													}),
													look.caption && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
														size: "sm",
														variant: "outline",
														className: "h-7 gap-1 rounded-none text-[11px]",
														onClick: () => copy(look.caption),
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3" }), " Copy"]
													})
												]
											})
										]
									})
								]
							}, look.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "managePass",
						className: "mt-0 flex-1 overflow-y-auto px-4 pb-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-16 text-center text-sm text-muted-foreground",
							children: ["Manage your subscription pass and VIP benefits here.", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 space-y-2 text-left text-xs text-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: "Unlimited VIP Pass"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Swap access, instant delivery priority and exclusive styling perks." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										className: "rounded-none bg-gradient-neon text-foreground",
										onClick: () => toast("Pass management coming soon"),
										children: "Manage Pass"
									})
								]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "returnPickups",
						className: "mt-0 flex-1 overflow-y-auto px-4 pb-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-16 text-center text-sm text-muted-foreground",
							children: ["Schedule your return pickup or track existing orders.", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 space-y-2 text-left text-xs text-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: "Return Pickups"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We’ll collect your fit from the address on file at the next available slot." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										className: "rounded-none bg-gradient-neon text-foreground",
										onClick: () => toast("Pickup scheduling coming soon"),
										children: "Schedule pickup"
									})
								]
							})]
						})
					})
				]
			})]
		})
	});
}
function useLookbook() {
	const [wishlist, setWishlist] = (0, import_react.useState)([]);
	const [looks, setLooks] = (0, import_react.useState)([]);
	return {
		wishlist,
		toggleWishlist: (0, import_react.useCallback)((id) => {
			setWishlist((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
		}, []),
		looks,
		saveLook: (0, import_react.useCallback)((look) => {
			const entry = {
				...look,
				id: `${look.productId}-${Date.now()}`,
				createdAt: Date.now()
			};
			setLooks((l) => [entry, ...l]);
			return entry;
		}, []),
		removeLook: (0, import_react.useCallback)((id) => {
			setLooks((l) => l.filter((x) => x.id !== id));
		}, []),
		setCaption: (0, import_react.useCallback)((id, caption) => {
			setLooks((l) => l.map((x) => x.id === id ? {
				...x,
				caption
			} : x));
		}, [])
	};
}
function filtersFromUrl() {
	if (typeof window === "undefined") return DEFAULT_FILTERS;
	const params = new URLSearchParams(window.location.search);
	return {
		...DEFAULT_FILTERS,
		categories: params.getAll("category"),
		sizes: params.getAll("size"),
		brands: params.getAll("brand"),
		availableOnly: params.get("availability") === "available",
		maxPerDay: Number(params.get("maxPerDay")) || DEFAULT_FILTERS.maxPerDay
	};
}
function Home() {
	const [category, setCategory] = (0, import_react.useState)("New Drops");
	const [filters, setFilters] = (0, import_react.useState)(filtersFromUrl);
	const [sort, setSort] = (0, import_react.useState)("trending");
	const [selected, setSelected] = (0, import_react.useState)(PRODUCTS[0] ?? null);
	const [modalOpen, setModalOpen] = (0, import_react.useState)(false);
	const [cartOpen, setCartOpen] = (0, import_react.useState)(false);
	const [cart, setCart] = (0, import_react.useState)([]);
	const { wishlist: saved, toggleWishlist: toggleSave, looks, saveLook, removeLook, setCaption } = useLookbook();
	const [accountOpen, setAccountOpen] = (0, import_react.useState)(false);
	const [accountTab, setAccountTab] = (0, import_react.useState)("wishlist");
	const [userName, setUserName] = (0, import_react.useState)(null);
	const [location, setLocation] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return "110001, Delhi";
		return window.localStorage.getItem("drippass.location") ?? "110001, Delhi";
	});
	const [banner, setBanner] = (0, import_react.useState)(0);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [passesExpanded, setPassesExpanded] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return true;
		return window.localStorage.getItem("drippass.passes-collapsed") !== "true";
	});
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (!supabase) return;
		supabase.auth.getSession().then(({ data }) => {
			setUserName(data.session?.user.user_metadata["display_name"] ?? data.session?.user.email?.split("@")[0] ?? null);
		});
		const { data } = supabase.auth.onAuthStateChange((_event, session) => {
			setUserName(session?.user.user_metadata["display_name"] ?? session?.user.email?.split("@")[0] ?? null);
		});
		return () => data.subscription.unsubscribe();
	}, []);
	const products = (0, import_react.useMemo)(() => {
		const list = PRODUCTS.filter((p) => {
			if (searchQuery.trim()) {
				const q = searchQuery.toLowerCase().trim();
				if (!(p.title.toLowerCase().includes(q) || p.designer.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.event.toLowerCase().includes(q))) return false;
			}
			if (filters.categories.length && !filters.categories.includes(p.category)) return false;
			if (filters.sizes.length && !filters.sizes.some((s) => p.sizes.includes(s))) return false;
			if (filters.genders.length && !filters.genders.includes(p.gender)) return false;
			if (filters.events.length && !filters.events.includes(p.event)) return false;
			if (filters.brands.length && !filters.brands.includes(p.designer)) return false;
			if (p.perDay > filters.maxPerDay) return false;
			if (filters.availableOnly && !p.available) return false;
			return true;
		});
		if (sort === "low") return [...list].sort((a, b) => a.perDay - b.perDay);
		if (sort === "high") return [...list].sort((a, b) => b.perDay - a.perDay);
		if (sort === "rating") return [...list].sort((a, b) => b.rating - a.rating);
		return list;
	}, [
		filters,
		sort,
		searchQuery
	]);
	const updateFilters = (next) => {
		setFilters(next);
		const params = new URLSearchParams(window.location.search);
		params.delete("category");
		params.delete("size");
		params.delete("brand");
		next.categories.forEach((value) => params.append("category", value));
		next.sizes.forEach((value) => params.append("size", value));
		next.brands.forEach((value) => params.append("brand", value));
		next.availableOnly ? params.set("availability", "available") : params.delete("availability");
		next.maxPerDay === DEFAULT_FILTERS.maxPerDay ? params.delete("maxPerDay") : params.set("maxPerDay", String(next.maxPerDay));
		window.history.replaceState(null, "", `${window.location.pathname}${params.toString() ? `?${params}` : ""}`);
	};
	const addToCart = (product, days) => {
		if (!product.available) {
			toast.error("Waitlist is unavailable: no persistence service is configured.");
			return;
		}
		setCart((c) => c.some((i) => i.product.id === product.id) ? c : [...c, {
			product,
			days
		}]);
		setModalOpen(false);
		setCartOpen(true);
		toast.success(`${product.title} reserved for ${days} days`);
	};
	const openAccount = (t) => {
		setAccountTab(t);
		setAccountOpen(true);
	};
	const openAuth = () => void navigate({ to: "/login" });
	const logout = () => {
		supabase?.auth.signOut();
		setUserName(null);
		toast.success("You have been logged out");
	};
	const openManagePass = () => {
		openAccount("managePass");
	};
	const openReturnPickups = () => {
		openAccount("returnPickups");
	};
	const active = BANNERS[banner];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background bg-grid-subtle",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {
				cartCount: cart.length,
				wishlistCount: saved.length,
				activeCategory: category,
				onCategory: (c) => {
					setCategory(c);
					if (c !== "Subscription Plans") updateFilters({
						...filters,
						categories: [c]
					});
				},
				onOpenCart: () => setCartOpen(true),
				onOpenWishlist: () => {
					if (userName) openAccount("wishlist");
					else openAuth();
				},
				onOpenLookbook: () => {
					if (userName) openAccount("lookbook");
					else openAuth();
				},
				onSearch: (query) => {
					setSearchQuery(query);
				},
				onLogin: userName ? logout : openAuth,
				location,
				onLocationChange: setLocation,
				onManagePass: () => {
					if (userName) openManagePass();
					else openAuth();
				},
				onReturnPickups: () => {
					if (userName) openReturnPickups();
					else openAuth();
				},
				...userName ? { userName } : {}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto max-w-[1600px] px-4 py-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-w-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "mt-0 space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
									className: "relative overflow-hidden border border-border",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: active.image,
											alt: active.title,
											width: 1600,
											height: 640,
											className: "h-[240px] w-full object-cover md:h-[320px]"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "absolute inset-0 flex flex-col justify-center gap-2 bg-gradient-to-r from-background via-background/80 to-transparent px-6 md:px-10",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[10px] tracking-luxe text-muted-foreground",
													children: active.kicker
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
													className: "max-w-sm font-display text-3xl leading-none md:text-5xl",
													children: active.title
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "max-w-xs text-xs text-muted-foreground md:text-sm",
													children: active.copy
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													className: "mt-2 w-fit rounded-none bg-gradient-neon text-foreground hover:opacity-90",
													children: active.cta
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "absolute bottom-4 right-4 flex gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "icon",
												variant: "outline",
												className: "size-8 rounded-none bg-background/80",
												onClick: () => setBanner((b) => (b - 1 + BANNERS.length) % BANNERS.length),
												"aria-label": "Previous banner",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "icon",
												variant: "outline",
												className: "size-8 rounded-none bg-background/80",
												onClick: () => setBanner((b) => (b + 1) % BANNERS.length),
												"aria-label": "Next banner",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
									className: "flex flex-wrap items-center justify-between gap-3 border border-border bg-card px-5 py-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-lg",
											children: "Rent more, pay less with a DRIPPASS"
										}), passesExpanded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "Silver 2 outfits/mo · Gold 4 outfits/mo · Unlimited VIP swaps"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											className: "rounded-none",
											onClick: () => void navigate({ to: "/passes" }),
											children: "Compare passes"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											className: "size-9",
											onClick: () => setPassesExpanded((expanded) => {
												window.localStorage.setItem("drippass.passes-collapsed", String(!expanded));
												return !expanded;
											}),
											"aria-label": passesExpanded ? "Minimize pass promotion" : "Expand pass promotion",
											children: passesExpanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4" })
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												variant: "outline",
												size: "sm",
												className: "gap-1.5 rounded-none lg:hidden",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-3.5" }), " Filters"]
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
											side: "left",
											className: "w-80 overflow-y-auto p-6",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
												className: "sr-only",
												children: "Filters"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSidebar, {
												filters,
												onChange: updateFilters
											})]
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: sort,
											onValueChange: setSort,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												className: "h-9 w-44 rounded-none text-xs",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "trending",
													children: "Sort: Trending"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "low",
													children: "Price: Low to High"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "high",
													children: "Price: High to Low"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "rating",
													children: "Top Rated"
												})
											] })]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterBar, {
										filters,
										onChange: updateFilters
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-display text-xl",
										children: searchQuery.trim() ? `Results for "${searchQuery}"` : category
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "outline",
										className: "rounded-none text-[10px]",
										children: [products.length, " FITS AVAILABLE"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3",
									children: products.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
										product: p,
										saved: saved.includes(p.id),
										onSave: () => toggleSave(p.id),
										onOpen: () => {
											setSelected(p);
											setModalOpen(true);
										},
										href: `/rent/${p.slug}`,
										onTryOn: () => {
											setSelected(p);
										}
									}, p.id))
								}),
								products.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "py-16 text-center text-sm text-muted-foreground",
									children: searchQuery.trim() ? `No fits match "${searchQuery}". Try another search or loosen your filters.` : "No fits match these filters. Loosen them up."
								})
							]
						})
					})
				}) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "mt-10 border-t border-border bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-4 py-8 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrippassLogo, { variant: "footer" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Sanitized rentals · Prepaid returns · Delivered across 14 cities" })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductModal, {
				product: selected,
				open: modalOpen,
				onOpenChange: setModalOpen,
				onAddToCart: (days) => selected && addToCart(selected, days),
				onTryOn: () => {
					setModalOpen(false);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartSheet, {
				open: cartOpen,
				onOpenChange: setCartOpen,
				items: cart,
				onRemove: (id) => setCart((c) => c.filter((i) => i.product.id !== id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LookbookSheet, {
				open: accountOpen,
				onOpenChange: setAccountOpen,
				tab: accountTab,
				onTabChange: setAccountTab,
				wishlist: saved,
				looks,
				onToggleWishlist: toggleSave,
				onRemoveLook: removeLook,
				onCaption: setCaption,
				onOpenProduct: (p) => {
					setSelected(p);
					setAccountOpen(false);
					setModalOpen(true);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})
		]
	});
}
//#endregion
export { Home as component };
