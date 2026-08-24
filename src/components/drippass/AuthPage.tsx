import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";

export function AuthPage({ mode }: { mode: "login" | "signup" }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const isSignup = mode === "signup";

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!supabase) {
      setMessage("Authentication is not configured. Add the Supabase variables to continue.");
      return;
    }
    if (!email.trim() || password.length < 8 || (isSignup && !name.trim())) {
      setMessage(isSignup ? "Enter your name, email, and a password of at least 8 characters." : "Enter a valid email and a password of at least 8 characters.");
      return;
    }
    setPending(true);
    const result = isSignup
      ? await supabase.auth.signUp({ email: email.trim(), password, options: { data: { display_name: name.trim() } } })
      : await supabase.auth.signInWithPassword({ email: email.trim(), password });
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
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}/` } });
    setPending(false);
    if (error) setMessage("Google sign-in could not start. Check the Supabase Google provider settings.");
  };

  return (
    <main className="min-h-screen bg-background px-4 py-12 pb-32 md:px-8">
      <div className="mx-auto max-w-md border border-border bg-card p-6 shadow-soft md:p-8">
        <p className="text-xs tracking-luxe text-muted-foreground">DRIPPASS ACCOUNT</p>
        <h1 className="mt-3 font-display text-4xl">{isSignup ? "Create your account." : "Welcome back."}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Use email or continue with Google. Sessions are managed by Supabase Auth.</p>
        <Button type="button" variant="outline" className="mt-6 w-full rounded-none" disabled={pending} onClick={google}>Continue with Google</Button>
        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" /> OR <span className="h-px flex-1 bg-border" /></div>
        <form className="space-y-4" onSubmit={submit}>
          {isSignup && <div className="space-y-1"><Label htmlFor="auth-page-name">Name</Label><Input id="auth-page-name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" /></div>}
          <div className="space-y-1"><Label htmlFor="auth-page-email">Email</Label><Input id="auth-page-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" /></div>
          <div className="space-y-1"><Label htmlFor="auth-page-password">Password</Label><Input id="auth-page-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={isSignup ? "new-password" : "current-password"} /></div>
          {message && <p role="alert" className="text-sm text-destructive">{message}</p>}
          <Button type="submit" className="w-full rounded-none bg-gradient-neon text-foreground" disabled={pending}>{pending ? "Working…" : isSignup ? "Create account" : "Log in"}</Button>
        </form>
        <p className="mt-6 text-center text-xs text-muted-foreground">{isSignup ? "Already have an account?" : "Need an account?"} <Link to={isSignup ? "/login" : "/signup"} className="text-foreground underline">{isSignup ? "Log in" : "Sign up"}</Link></p>
      </div>
    </main>
  );
}
