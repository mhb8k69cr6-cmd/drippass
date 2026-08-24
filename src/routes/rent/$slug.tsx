import { useState } from "react";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { CalendarDays, Check, ChevronLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getProductBySlug } from "@/data/products";
import { toast } from "sonner";

export const Route = createFileRoute("/rent/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.title} | DRIPPASS` },
          {
            name: "description",
            content: `${loaderData.product.title} by ${loaderData.product.designer}. Rent from ₹${loaderData.product.perDay} per day at DRIPPASS.`,
          },
          { property: "og:title", content: `${loaderData.product.title} | DRIPPASS` },
        ]
      : [],
  }),
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState<string>();
  const [startDate, setStartDate] = useState(() => new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(() => new Date(Date.now() + 10 * 86400000).toISOString().slice(0, 10));
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [checkoutState, setCheckoutState] = useState<"idle" | "processing" | "success" | "declined">("idle");

  const rentalDays = Math.max(1, Math.round((new Date(`${endDate}T00:00:00Z`).getTime() - new Date(`${startDate}T00:00:00Z`).getTime()) / 86400000));
  const rentalTotal = rentalDays * product.perDay;
  const deposit = Math.round(product.retail * 0.1);

  const openCheckout = () => {
    if (new Date(`${endDate}T00:00:00Z`) < new Date(`${startDate}T00:00:00Z`)) {
      toast.error("Choose an end date after the start date.");
      return;
    }
    setCheckoutState("idle");
    setCheckoutOpen(true);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
        <a href="/rent" className="inline-flex items-center gap-1 text-xs tracking-luxe text-muted-foreground hover:text-foreground">
          <ChevronLeft className="size-3" /> BACK TO THE ROTATION
        </a>
        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
          <section>
            <div className="aspect-[3/4] overflow-hidden bg-muted">
              <img
                src={product.gallery[activeImage]}
                alt={`${product.title} by ${product.designer}`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {product.gallery.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`aspect-[3/4] overflow-hidden border ${index === activeImage ? "border-foreground" : "border-transparent opacity-60"}`}
                  aria-label={`View image ${index + 1}`}
                >
                  <img src={image} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </section>

          <section className="lg:py-8">
            <p className="text-xs tracking-luxe text-muted-foreground">{product.designer}</p>
            <h1 className="mt-3 font-display text-4xl leading-tight md:text-5xl">{product.title}</h1>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="rounded-none">{product.event}</Badge>
              {product.badge && <Badge className="rounded-none">{product.badge}</Badge>}
            </div>
            <div className="mt-8 border-y border-border py-5">
              <p className="text-sm text-muted-foreground line-through">Retail ₹{product.retail.toLocaleString("en-IN")}</p>
              <p className="font-display text-4xl">₹{product.perDay.toLocaleString("en-IN")} <span className="font-sans text-sm text-muted-foreground">/ day</span></p>
              <p className={`mt-2 text-sm ${product.rentalStatus === "AVAILABLE" ? "text-emerald-600" : "text-muted-foreground"}`}>
                {product.rentalStatus === "AVAILABLE" ? "Available to reserve" : product.rentalStatus === "RESERVED" ? "Currently Reserved" : "Not Available for Rent"}
              </p>
            </div>
            <div className="mt-8">
              <p className="mb-3 text-xs tracking-luxe text-muted-foreground">SELECT SIZE</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSize(option)}
                    className={`h-10 w-12 border text-sm ${size === option ? "border-foreground bg-foreground text-background" : "border-border"}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="space-y-1"><label htmlFor="rental-start" className="text-xs">Rental starts</label><Input id="rental-start" type="date" min={new Date().toISOString().slice(0, 10)} value={startDate} onChange={(event) => setStartDate(event.target.value)} /></div>
              <div className="space-y-1"><label htmlFor="rental-end" className="text-xs">Rental ends</label><Input id="rental-end" type="date" min={startDate} value={endDate} onChange={(event) => setEndDate(event.target.value)} /></div>
            </div>
            <Button
              className="mt-8 h-12 w-full rounded-none bg-gradient-neon text-foreground"
              disabled={!product.available || !size}
              onClick={openCheckout}
            >
              <CalendarDays className="size-4" /> {product.available ? (size ? "Continue to sandbox checkout" : "Select a size to continue") : "Waitlist unavailable"}
            </Button>
            <Link to="/try-on" search={{ product: product.slug }} className="mt-3 inline-flex w-full items-center justify-center border border-border px-4 py-3 text-sm hover:bg-muted">Try this garment in AI Studio</Link>
            {product.available && size && (
              <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
                <DialogContent className="rounded-none sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Sandbox checkout</DialogTitle>
                    <DialogDescription>No real payment or reservation is made. This is a test walkthrough.</DialogDescription>
                  </DialogHeader>
                  <form
                    className="space-y-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  setCheckoutState("processing");
                  window.setTimeout(() => setCheckoutState(cardNumber.replace(/\s/g, "").endsWith("0002") ? "declined" : "success"), 700);
                }}
              >
                <div>
                  <p className="text-xs tracking-luxe text-muted-foreground">SANDBOX CHECKOUT</p>
                  <p className="mt-1 text-sm">{size} · {rentalDays} days · ₹{(rentalTotal + deposit).toLocaleString("en-IN")} total</p>
                  <p className="mt-1 text-xs text-muted-foreground">{startDate} to {endDate}</p>
                </div>
                {checkoutState === "success" ? (
                  <div className="border border-border p-3 text-sm"><p className="font-medium">Sandbox payment approved</p><p className="mt-1 text-xs text-muted-foreground">Your test walkthrough is complete. No order was created.</p></div>
                ) : (
                  <>
                    <div className="space-y-1"><label htmlFor="detail-card" className="text-xs">Test card number</label><Input id="detail-card" required inputMode="numeric" value={cardNumber} onChange={(event) => setCardNumber(event.target.value)} placeholder="4242 4242 4242 4242" /></div>
                    <div className="grid grid-cols-2 gap-3"><div className="space-y-1"><label htmlFor="detail-expiry" className="text-xs">Expiry</label><Input id="detail-expiry" required placeholder="12/30" /></div><div className="space-y-1"><label htmlFor="detail-cvc" className="text-xs">CVC</label><Input id="detail-cvc" required inputMode="numeric" placeholder="123" /></div></div>
                    {checkoutState === "declined" && <p className="text-sm text-destructive">Sandbox decline. Use a different test card.</p>}
                    <div className="flex gap-2"><Button type="button" variant="outline" className="rounded-none" onClick={() => setCheckoutOpen(false)}>Cancel</Button><Button type="submit" disabled={checkoutState === "processing"} className="flex-1 rounded-none bg-gradient-neon text-foreground">{checkoutState === "processing" ? "Processing…" : "Run sandbox payment"}</Button></div>
                  </>
                )}
                  </form>
                </DialogContent>
              </Dialog>
            )}
            <div className="mt-8 space-y-3 border border-border p-5 text-sm">
              <p className="flex items-center gap-2"><ShieldCheck className="size-4 text-gold" /> Dry-cleaned and disinfected before delivery</p>
              <p className="flex items-center gap-2"><Check className="size-4 text-gold" /> Prepaid return bag and pickup included</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
