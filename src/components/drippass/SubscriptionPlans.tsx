import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Check, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PASS_PLANS, type PassState, getPassState } from "@/lib/pass.functions";
import { currentAccessToken } from "@/lib/pass-client";

export function SubscriptionPlans() {
  const [pass, setPass] = useState<PassState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const loadPass = useServerFn(getPassState);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    void currentAccessToken().then((accessToken) => {
      if (!accessToken) { setError("Sign in to view and manage your pass."); setLoading(false); return; }
      return loadPass({ data: { accessToken } }).then((state) => {
        if (active) setPass(state);
      });
    }).catch(() => { if (active) setError("Your pass details could not be loaded."); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [loadPass]);

  const choose = async (planId: string) => {
    if (planId === "FREE") {
      if (pass?.planId === "FREE") return;
      await navigate({ to: "/signup" });
      return;
    }
    await navigate({ to: "/checkout/membership/$plan", params: { plan: planId.toLowerCase() } });
  };

  return (
    <>
      {loading && <p className="mb-6 text-sm text-muted-foreground">Loading your pass...</p>}
      {error && <p role="alert" className="mb-6 border border-destructive/40 p-4 text-sm text-destructive">{error}</p>}
      {pass && (
        <section className="mb-6 border border-border bg-card p-5 shadow-soft">
          <p className="text-[10px] tracking-luxe text-muted-foreground">YOUR DRIPPASS</p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <div><h2 className="font-display text-3xl">{PASS_PLANS.find((plan) => plan.id === pass.planId)?.name}</h2><p className="mt-1 text-sm text-muted-foreground">{pass.planId === "FREE" ? "₹0 · lifetime introductory access" : "Active pass"}</p></div>
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div><p className="text-muted-foreground">AI Try-On</p><p className="mt-1 font-medium">{pass.aiTryOnUses < 0 ? "Unlimited" : `${pass.aiTryOnUses} remaining`}</p></div>
              <div><p className="text-muted-foreground">AI Stylist</p><p className="mt-1 font-medium">{pass.aiStylistUses < 0 ? "Unlimited" : `${pass.aiStylistUses} remaining`}</p></div>
              <div><p className="text-muted-foreground">Rental credits</p><p className="mt-1 font-medium">{pass.unlimitedSwaps ? "Unlimited" : pass.rentalCredits}</p></div>
            </div>
          </div>
        </section>
      )}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {PASS_PLANS.map((plan) => (
        <div
          key={plan.name}
          className={`flex flex-col border p-6 ${
            plan.highlight ? "rounded-2xl border-foreground bg-transparent shadow-soft" : "rounded-2xl border-border bg-transparent"
          }`}
        >
          {plan.highlight && (
            <Badge className="mb-3 w-fit gap-1 rounded-none bg-gradient-neon text-[10px] tracking-luxe text-foreground">
              <Crown className="size-3" /> MOST RENTED
            </Badge>
          )}
          <h3 className="font-display text-2xl">{plan.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{plan.outfits}</p>
          <p className="mt-4 font-display text-4xl">
            ₹{plan.price}
            <span className="font-sans text-sm text-muted-foreground">/mo</span>
          </p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {plan.perks.map((p) => (
              <li key={p} className="flex gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-gold" />
                {p}
              </li>
            ))}
          </ul>
          <Button
            onClick={() => void choose(plan.id)}
            disabled={pass?.planId === plan.id}
            className={`mt-6 w-full rounded-none ${plan.highlight ? "bg-gradient-neon text-foreground hover:opacity-90" : ""}`}
            variant={plan.highlight ? "default" : "outline"}
          >
            {pass?.planId === plan.id ? "Current Pass" : plan.id === "FREE" ? "Start Free" : `Choose ${plan.name}`}
          </Button>
        </div>
      ))}
      </section>
    </>
  );
}
