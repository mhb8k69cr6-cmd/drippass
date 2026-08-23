import { i as __toESM } from "../_runtime.mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { l as getProductBySlug } from "./products-sweX_gG3.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { B as notFound, _ as createRootRouteWithContext, b as useRouter, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { T as Crown, c as Sparkles, x as LayoutGrid } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Co37hugf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CRUdRE9h.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var ITEMS = [
	{
		to: "/",
		label: "Browsing Feed",
		icon: LayoutGrid
	},
	{
		to: "/passes",
		label: "Subscription Plans",
		icon: Crown
	},
	{
		to: "/try-on",
		label: "AI Try-On Studio",
		icon: Sparkles
	}
];
function NavigationDock() {
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"aria-label": "Primary navigation",
		className: "fixed inset-x-0 bottom-4 z-50 mx-auto flex w-fit max-w-[calc(100vw-1rem)] items-center gap-1 rounded-full border border-foreground/15 bg-background/85 p-1.5 shadow-soft backdrop-blur-xl",
		children: ITEMS.map(({ to, label, icon: Icon }) => {
			const active = to === "/" ? pathname === "/" || pathname.startsWith("/rent") : pathname.startsWith(to);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to,
				"aria-label": label,
				title: label,
				className: `group relative grid min-h-11 min-w-11 place-items-center rounded-full px-3 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${active ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						className: "size-4",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: label
					}),
					active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute -bottom-1 size-1 rounded-full bg-gold",
						"aria-hidden": "true"
					})
				]
			}, to);
		})
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$7 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Lovable App" },
			{
				name: "description",
				content: "Lovable Generated Project"
			},
			{
				name: "author",
				content: "Lovable"
			},
			{
				property: "og:title",
				content: "Lovable App"
			},
			{
				property: "og:description",
				content: "Lovable Generated Project"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400;6..96,600;6..96,700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.png",
				type: "image/png"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$7.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavigationDock, {})]
	});
}
var $$splitComponentImporter$6 = () => import("./routes-xB2ZU7bb.mjs");
var Route$6 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "DRIPPASS — Rent Designer Fashion | Wear. Return. Repeat." },
		{
			name: "description",
			content: "Rent party, streetwear and gala fits from ₹549/day. AI try-on studio, sanitized delivery and monthly outfit passes for Gen Z."
		},
		{
			property: "og:title",
			content: "DRIPPASS — Rent Designer Fashion"
		},
		{
			property: "og:description",
			content: "AI-styled outfit rentals for parties, galas and everyday drip. Wear. Return. Repeat."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./login-WycjXhX8.mjs");
var Route$5 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Log in | DRIPPASS" }, {
		name: "description",
		content: "Log in to your DRIPPASS account."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./passes-DAqgARFd.mjs");
var Route$4 = createFileRoute("/passes")({
	head: () => ({ meta: [{ title: "Subscription Plans | DRIPPASS" }, {
		name: "description",
		content: "Compare DRIPPASS rental subscription plans."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./signup-CyRCAapz.mjs");
var Route$3 = createFileRoute("/signup")({
	head: () => ({ meta: [{ title: "Sign up | DRIPPASS" }, {
		name: "description",
		content: "Create your DRIPPASS account."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./try-on-rpYBBx2l.mjs");
var Route$2 = createFileRoute("/try-on")({
	validateSearch: (search) => ({ product: typeof search.product === "string" ? search.product : void 0 }),
	head: () => ({ meta: [{ title: "AI Try-On Studio | DRIPPASS" }, {
		name: "description",
		content: "Preview a DRIPPASS garment with the AI Try-On Studio."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./rent-ep1IlEXa.mjs");
var Route$1 = createFileRoute("/rent/")({
	head: () => ({ meta: [{ title: "Rent Designer Fits | DRIPPASS" }, {
		name: "description",
		content: "Browse designer outfits available to rent from DRIPPASS."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_slug-ChYzSe9a.mjs");
var Route = createFileRoute("/rent/$slug")({
	loader: ({ params }) => {
		const product = getProductBySlug(params.slug);
		if (!product) throw notFound();
		return { product };
	},
	head: ({ loaderData }) => ({ meta: loaderData ? [
		{ title: `${loaderData.product.title} | DRIPPASS` },
		{
			name: "description",
			content: `${loaderData.product.title} by ${loaderData.product.designer}. Rent from ₹${loaderData.product.perDay} per day at DRIPPASS.`
		},
		{
			property: "og:title",
			content: `${loaderData.product.title} | DRIPPASS`
		}
	] : [] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$7
});
var LoginRoute = Route$5.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$7
});
var PassesRoute = Route$4.update({
	id: "/passes",
	path: "/passes",
	getParentRoute: () => Route$7
});
var SignupRoute = Route$3.update({
	id: "/signup",
	path: "/signup",
	getParentRoute: () => Route$7
});
var TryOnRoute = Route$2.update({
	id: "/try-on",
	path: "/try-on",
	getParentRoute: () => Route$7
});
var RentIndexRoute = Route$1.update({
	id: "/rent/",
	path: "/rent/",
	getParentRoute: () => Route$7
});
var rootRouteChildren = {
	IndexRoute,
	LoginRoute,
	PassesRoute,
	SignupRoute,
	TryOnRoute,
	RentSlugRoute: Route.update({
		id: "/rent/$slug",
		path: "/rent/$slug",
		getParentRoute: () => Route$7
	}),
	RentIndexRoute
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { Route as n, Route$2 as r, router_exports as t };
