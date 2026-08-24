import { createFileRoute } from "@tanstack/react-router";
import { SubscriptionPlans } from "@/components/drippass/SubscriptionPlans";

export const Route = createFileRoute("/passes")({
  head: () => ({
    meta: [
      { title: "Subscription Plans | DRIPPASS" },
      { name: "description", content: "Compare DRIPPASS rental subscription plans." },
    ],
  }),
  component: PassesPage,
});

function PassesPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-10 pb-32 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs tracking-luxe text-muted-foreground">DRIPPASS MEMBERSHIP</p>
        <h1 className="mt-3 font-display text-4xl md:text-6xl">Choose your rotation.</h1>
        <p className="mt-4 max-w-xl text-sm text-muted-foreground">
          Start with a Free Pass, then upgrade when you are ready for more rentals and unlimited styling.
        </p>
        <div className="mt-10">
          <SubscriptionPlans />
        </div>
      </div>
    </main>
  );
}