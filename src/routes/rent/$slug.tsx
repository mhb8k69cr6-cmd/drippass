import { useState } from "react";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { CalendarDays, Check, ChevronLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { getProductBySlug, type Product } from "@/data/products";
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

  const rentalDays = Math.max(1, Math.round((new Date(`${endDate}T00:00:00Z`).getTime() - new Date(`${startDate}T00:00:00Z`).getTime()) / 86400000));
  const addToRentalCart = () => {
    if (new Date(`${endDate}T00:00:00Z`) < new Date(`${startDate}T00:00:00Z`)) {
      toast.error("Choose an end date after the start date.");
      return;
    }
    const existing = JSON.parse(window.localStorage.getItem("drippass.cart") ?? "[]") as Array<{ product: Product; days: number; size: string }>;
    const next = existing.some((item) => item.product.id === product.id) ? existing : [...existing, { product, days: rentalDays, size }];
    window.localStorage.setItem("drippass.cart", JSON.stringify(next));
    window.dispatchEvent(new Event("drippass:cart-updated"));
    toast.success(`${product.title} added to your rental cart`);
    window.location.assign("/?cart=open");
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
                className={`h-full w-full object-cover ${product.id === "MNE-009" ? "object-top" : ""}`}
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
                  <img src={image} alt="" className={`h-full w-full object-cover ${product.id === "MNE-009" ? "object-top" : ""}`} />
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
              onClick={addToRentalCart}
            >
              <CalendarDays className="size-4" /> {product.available ? (size ? "Add to rental cart" : "Select a size to continue") : "Waitlist unavailable"}
            </Button>
            <Link to="/try-on" search={{ product: product.slug }} className="mt-3 inline-flex w-full items-center justify-center border border-border px-4 py-3 text-sm hover:bg-muted">Try this garment in AI Studio</Link>
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
