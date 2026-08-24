import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, ChevronLeft, CreditCard, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getPassPlan, activatePaidPass, type PassId } from "@/lib/pass.functions";
import { currentAccessToken } from "@/lib/pass-client";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout/membership/$plan")({
  head: () => ({
    meta: [
      { title: "Membership Checkout | DRIPPASS" },
      { name: "description", content: "Activate a DRIPPASS membership pass." },
    ],
  }),
  component: MembershipCheckout,
});

type CheckoutState = "idle" | "processing" | "success";

function MembershipCheckout() {
  const { plan: planParam } = Route.useParams();
  const planId = planParam.toUpperCase() as PassId;
  const plan = getPassPlan(planId);
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [state, setState] = useState<CheckoutState>("idle");

  if (!plan || plan.id === "FREE") {
    return (
      <main className="min-h-screen bg-background px-4 py-12 md:px-8">
        <div className="mx-auto max-w-xl border border-border p-6">
          <p className="text-sm">Free Pass activation happens automatically when you create an account.</p>
          <Link to="/passes" className="mt-4 inline-flex text-sm underline">Back to passes</Link>
        </div>
      </main>
    );
  }

  const submit = async (event: React.FormEvent) => {
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
      await activatePaidPass({
        data: { accessToken, planId: plan.id as "SILVER" | "GOLD" | "VIP", activationKey: crypto.randomUUID() },
      });
      setState("success");
    } catch (error) {
      setState("idle");
      toast.error(error instanceof Error ? error.message : "Pass activation failed.");
    }
  };

  return (
    <main className="min-h-screen bg-background px-4 py-10 pb-32 md:px-8">
      <div className="mx-auto max-w-5xl">
        <Link to="/passes" className="inline-flex items-center gap-1 text-xs tracking-luxe text-muted-foreground hover:text-foreground">
          <ChevronLeft className="size-3" /> BACK TO PASSES
        </Link>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <section className="border border-border bg-card p-6 shadow-soft md:p-8">
            <p className="text-xs tracking-luxe text-muted-foreground">MEMBERSHIP CHECKOUT</p>
            <h1 className="mt-3 font-display text-4xl">DRIPPASS {plan.name.replace(" Pass", "")}.</h1>
            <p className="mt-2 text-sm text-muted-foreground">Digital membership only. No address, delivery details, or rental dates are collected here.</p>
            <div className="mt-8 border-y border-border py-5">
              <p className="font-display text-3xl">₹{plan.price.toLocaleString("en-IN")}<span className="font-sans text-sm text-muted-foreground"> / month</span></p>
              <ul className="mt-4 space-y-2 text-sm">
                {plan.perks.map((perk) => <li key={perk} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-gold" />{perk}</li>)}
              </ul>
            </div>
            {state === "success" ? (
              <div className="mt-8 border border-emerald-600/50 p-4">
                <p className="font-medium">{plan.name} activated.</p>
                <p className="mt-1 text-sm text-muted-foreground">Your account now uses this pass as its single active membership.</p>
                <Button className="mt-4 rounded-none" onClick={() => void navigate({ to: "/passes" })}>View My Pass</Button>
              </div>
            ) : (
              <form className="mt-8 space-y-4" onSubmit={submit}>
                <p className="flex items-center gap-2 text-xs tracking-luxe text-muted-foreground"><CreditCard className="size-4" /> MOCK PAYMENT</p>
                <p className="text-xs text-muted-foreground">This is a test checkout. No real payment is processed.</p>
                <div className="space-y-1"><label htmlFor="membership-card" className="text-xs">Test card number</label><Input id="membership-card" required inputMode="numeric" value={cardNumber} onChange={(event) => setCardNumber(event.target.value)} placeholder="4242 4242 4242 4242" /></div>
                <div className="grid grid-cols-2 gap-3"><div className="space-y-1"><label htmlFor="membership-expiry" className="text-xs">Expiry</label><Input id="membership-expiry" required value={expiry} onChange={(event) => setExpiry(event.target.value)} placeholder="12/30" /></div><div className="space-y-1"><label htmlFor="membership-cvc" className="text-xs">CVC</label><Input id="membership-cvc" required value={cvc} onChange={(event) => setCvc(event.target.value)} placeholder="123" /></div></div>
                <Button type="submit" disabled={state === "processing"} className="w-full rounded-none bg-gradient-neon text-foreground">{state === "processing" ? "Activating pass..." : `Start ${plan.name}`}</Button>
              </form>
            )}
          </section>
          <aside className="border border-border p-6">
            <p className="flex items-center gap-2 text-xs tracking-luxe text-muted-foreground"><ShieldCheck className="size-4 text-gold" /> DIGITAL MEMBERSHIP</p>
            <h2 className="mt-4 font-display text-2xl">One account. One active pass.</h2>
            <p className="mt-2 text-sm text-muted-foreground">Upgrades replace the active pass without deleting your rental history or lifetime Free Pass usage.</p>
            <div className="mt-6 space-y-3 text-sm text-muted-foreground"><p>✓ Memberships never enter the rental cart.</p><p>✓ Activation is recorded server-side.</p><p>✓ Mock payment is clearly labeled for demo use.</p></div>
          </aside>
        </div>
      </div>
    </main>
  );
}
