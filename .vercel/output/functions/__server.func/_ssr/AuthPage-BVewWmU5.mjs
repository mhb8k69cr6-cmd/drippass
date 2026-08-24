import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-PwNqyxv_.mjs";
import { t as Input } from "./input-uzm9g8Y7.mjs";
import { t as supabase } from "./supabase-DHkNjKmq.mjs";
import { t as Label } from "./label-BeT0bXvu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AuthPage-BVewWmU5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPage({ mode }) {
	const navigate = useNavigate();
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)(null);
	const [pending, setPending] = (0, import_react.useState)(false);
	const isSignup = mode === "signup";
	const submit = async (event) => {
		event.preventDefault();
		if (!supabase) {
			setMessage("Authentication is not configured. Add the Supabase variables to continue.");
			return;
		}
		if (!email.trim() || password.length < 8 || isSignup && !name.trim()) {
			setMessage(isSignup ? "Enter your name, email, and a password of at least 8 characters." : "Enter a valid email and a password of at least 8 characters.");
			return;
		}
		setPending(true);
		const result = isSignup ? await supabase.auth.signUp({
			email: email.trim(),
			password,
			options: { data: { display_name: name.trim() } }
		}) : await supabase.auth.signInWithPassword({
			email: email.trim(),
			password
		});
		setPending(false);
		if (result.error) {
			setMessage("Authentication failed. Check your details and try again.");
			return;
		}
		if (isSignup && !result.data.session) {
			setMessage("Account created with a Free Pass. Check your email to confirm access.");
			return;
		}
		await navigate({ to: "/" });
	};
	const google = async () => {
		if (!supabase) {
			setMessage("Google sign-in is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY, then enable Google in Supabase Auth providers.");
			return;
		}
		setPending(true);
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: { redirectTo: `${window.location.origin}/` }
		});
		setPending(false);
		if (error) setMessage("Google sign-in could not start. Check the Supabase Google provider settings.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-background px-4 py-12 pb-32 md:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-md border border-border bg-card p-6 shadow-soft md:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-luxe text-muted-foreground",
					children: "DRIPPASS ACCOUNT"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl",
					children: isSignup ? "Create your account." : "Welcome back."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Use email or continue with Google. Sessions are managed by Supabase Auth."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					className: "mt-6 w-full rounded-none",
					disabled: pending,
					onClick: google,
					children: "Continue with Google"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "my-6 flex items-center gap-3 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
						" OR ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "space-y-4",
					onSubmit: submit,
					children: [
						isSignup && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "auth-page-name",
								children: "Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "auth-page-name",
								value: name,
								onChange: (event) => setName(event.target.value),
								autoComplete: "name"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "auth-page-email",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "auth-page-email",
								type: "email",
								value: email,
								onChange: (event) => setEmail(event.target.value),
								autoComplete: "email"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "auth-page-password",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "auth-page-password",
								type: "password",
								value: password,
								onChange: (event) => setPassword(event.target.value),
								autoComplete: isSignup ? "new-password" : "current-password"
							})]
						}),
						message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "alert",
							className: "text-sm text-destructive",
							children: message
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "w-full rounded-none bg-gradient-neon text-foreground",
							disabled: pending,
							children: pending ? "Working…" : isSignup ? "Create account" : "Log in"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-center text-xs text-muted-foreground",
					children: [
						isSignup ? "Already have an account?" : "Need an account?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: isSignup ? "/login" : "/signup",
							className: "text-foreground underline",
							children: isSignup ? "Log in" : "Sign up"
						})
					]
				})
			]
		})
	});
}
//#endregion
export { AuthPage as t };
