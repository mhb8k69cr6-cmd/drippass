import { Check, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PLANS } from "@/data/products";
import { toast } from "sonner";

export function SubscriptionPlans() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {PLANS.map((plan) => (
        <div
          key={plan.name}
          className={`flex flex-col border p-6 ${
            plan.highlight ? "border-foreground bg-card shadow-soft" : "border-border bg-card"
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
               onClick={() => toast.error("Pass selection is unavailable: no membership or billing service is configured.")}
            className={`mt-6 w-full rounded-none ${plan.highlight ? "bg-gradient-neon text-foreground hover:opacity-90" : ""}`}
            variant={plan.highlight ? "default" : "outline"}
          >
            Choose {plan.name}
          </Button>
        </div>
      ))}
    </section>
  );
}
