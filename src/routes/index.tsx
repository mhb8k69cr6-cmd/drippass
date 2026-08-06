import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, LayoutGrid, Crown, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

import { SiteHeader } from "@/components/drippass/SiteHeader";
import { FilterSidebar, DEFAULT_FILTERS, type Filters } from "@/components/drippass/FilterSidebar";
import { ProductCard } from "@/components/drippass/ProductCard";
import { AIStudio } from "@/components/drippass/AIStudio";
import { ProductModal } from "@/components/drippass/ProductModal";
import { CartSheet, type CartItem } from "@/components/drippass/CartSheet";
import { SubscriptionPlans } from "@/components/drippass/SubscriptionPlans";
import { LookbookSheet } from "@/components/drippass/LookbookSheet";
import { useLookbook } from "@/lib/lookbook";
import { BANNERS, PRODUCTS, type Product } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DRIPPASS — Rent Designer Fashion | Wear. Return. Repeat." },
      {
        name: "description",
        content:
          "Rent party, streetwear and gala fits from ₹549/day. AI try-on studio, sanitized delivery and monthly outfit passes for Gen Z.",
      },
      { property: "og:title", content: "DRIPPASS — Rent Designer Fashion" },
      {
        property: "og:description",
        content: "AI-styled outfit rentals for parties, galas and everyday drip. Wear. Return. Repeat.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const [tab, setTab] = useState("feed");
  const [category, setCategory] = useState("New Drops");
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState("trending");
  const [selected, setSelected] = useState<Product | null>(PRODUCTS[0] ?? null);
  const [modalOpen, setModalOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const { wishlist: saved, toggleWishlist: toggleSave, looks, saveLook, removeLook, setCaption } =
    useLookbook();
  const [accountOpen, setAccountOpen] = useState(false);
  const [accountTab, setAccountTab] = useState("wishlist");
  const [banner, setBanner] = useState(0);

  const products = useMemo(() => {
    const list = PRODUCTS.filter((p) => {
      if (filters.categories.length && !filters.categories.includes(p.category)) return false;
      if (filters.sizes.length && !filters.sizes.some((s) => p.sizes.includes(s))) return false;
      if (filters.genders.length && !filters.genders.includes(p.gender)) return false;
      if (filters.events.length && !filters.events.includes(p.event)) return false;
      if (filters.brands.length && !filters.brands.includes(p.designer)) return false;
      if (p.perDay > filters.maxPerDay) return false;
      return true;
    });
    if (sort === "low") return [...list].sort((a, b) => a.perDay - b.perDay);
    if (sort === "high") return [...list].sort((a, b) => b.perDay - a.perDay);
    if (sort === "rating") return [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [filters, sort]);

  const addToCart = (product: Product, days: number) => {
    if (!product.available) {
      toast("Added to waitlist — we'll ping you when it returns");
      return;
    }
    setCart((c) => (c.some((i) => i.product.id === product.id) ? c : [...c, { product, days }]));
    setModalOpen(false);
    setCartOpen(true);
    toast.success(`${product.title} reserved for ${days} days`);
  };

  const handleSaveLook = (
    product: Product,
    look: { photo: string | null; fit: number; pose: number },
  ) => {
    saveLook({
      productId: product.id,
      title: product.title,
      designer: product.designer,
      category: product.category,
      image: product.image,
      photo: look.photo,
      fit: look.fit,
      pose: look.pose,
    });
    toast.success("Look saved to your lookbook");
  };

  const openAccount = (t: string) => {
    setAccountTab(t);
    setAccountOpen(true);
  };

  const active = BANNERS[banner]!;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader
        cartCount={cart.length}
        wishlistCount={saved.length}
        activeCategory={category}
        onCategory={(c) => {
          setCategory(c);
          if (c === "Subscription Plans") setTab("plans");
          else setTab("feed");
        }}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => openAccount("wishlist")}
        onOpenLookbook={() => openAccount("lookbook")}
      />

      <main className="mx-auto max-w-[1600px] px-4 py-5">
        <Tabs value={tab} onValueChange={setTab}>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <TabsList className="rounded-none bg-muted p-1">
              <TabsTrigger value="feed" className="gap-1.5 rounded-none text-xs">
                <LayoutGrid className="size-3.5" /> Browsing Feed
              </TabsTrigger>
              <TabsTrigger value="plans" className="gap-1.5 rounded-none text-xs">
                <Crown className="size-3.5" /> Subscription Plans
              </TabsTrigger>
              <TabsTrigger value="studio" className="gap-1.5 rounded-none text-xs">
                <Sparkles className="size-3.5" /> AI Try-On Studio
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1.5 rounded-none lg:hidden">
                    <SlidersHorizontal className="size-3.5" /> Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto p-6">
                  <SheetTitle className="sr-only">Filters</SheetTitle>
                  <FilterSidebar filters={filters} onChange={setFilters} />
                </SheetContent>
              </Sheet>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="h-9 w-44 rounded-none text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trending">Sort: Trending</SelectItem>
                  <SelectItem value="low">Price: Low to High</SelectItem>
                  <SelectItem value="high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_360px]">
            <div className="hidden lg:block">
              <FilterSidebar filters={filters} onChange={setFilters} />
            </div>

            <div className="min-w-0">
              <TabsContent value="feed" className="mt-0 space-y-6">
                {/* Banner carousel */}
                <section className="relative overflow-hidden border border-border">
                  <img
                    src={active.image}
                    alt={active.title}
                    width={1600}
                    height={640}
                    className="h-[240px] w-full object-cover md:h-[320px]"
                  />
                  <div className="absolute inset-0 flex flex-col justify-center gap-2 bg-gradient-to-r from-background via-background/80 to-transparent px-6 md:px-10">
                    <p className="text-[10px] tracking-luxe text-muted-foreground">{active.kicker}</p>
                    <h1 className="max-w-sm font-display text-3xl leading-none md:text-5xl">
                      {active.title}
                    </h1>
                    <p className="max-w-xs text-xs text-muted-foreground md:text-sm">{active.copy}</p>
                    <Button className="mt-2 w-fit rounded-none bg-gradient-neon text-foreground hover:opacity-90">
                      {active.cta}
                    </Button>
                  </div>
                  <div className="absolute bottom-4 right-4 flex gap-1">
                    <Button
                      size="icon"
                      variant="outline"
                      className="size-8 rounded-none bg-background/80"
                      onClick={() => setBanner((b) => (b - 1 + BANNERS.length) % BANNERS.length)}
                      aria-label="Previous banner"
                    >
                      <ChevronLeft className="size-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="size-8 rounded-none bg-background/80"
                      onClick={() => setBanner((b) => (b + 1) % BANNERS.length)}
                      aria-label="Next banner"
                    >
                      <ChevronRight className="size-4" />
                    </Button>
                  </div>
                </section>

                {/* Subscription strip */}
                <section className="flex flex-wrap items-center justify-between gap-3 border border-border bg-card px-5 py-4">
                  <div>
                    <p className="font-display text-lg">Rent more, pay less with a DRIPPASS</p>
                    <p className="text-xs text-muted-foreground">
                      Silver 2 outfits/mo · Gold 4 outfits/mo · Unlimited VIP swaps
                    </p>
                  </div>
                  <Button variant="outline" className="rounded-none" onClick={() => setTab("plans")}>
                    Compare passes
                  </Button>
                </section>

                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl">{category}</h2>
                  <Badge variant="outline" className="rounded-none text-[10px]">
                    {products.length} FITS AVAILABLE
                  </Badge>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {products.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      saved={saved.includes(p.id)}
                      onSave={() => toggleSave(p.id)}
                      onOpen={() => {
                        setSelected(p);
                        setModalOpen(true);
                      }}
                      onTryOn={() => {
                        setSelected(p);
                        setTab("studio");
                      }}
                    />
                  ))}
                </div>
                {products.length === 0 && (
                  <p className="py-16 text-center text-sm text-muted-foreground">
                    No fits match these filters. Loosen them up.
                  </p>
                )}
              </TabsContent>

              <TabsContent value="plans" className="mt-0 space-y-6">
                <div>
                  <h2 className="font-display text-3xl">Subscription Passes</h2>
                  <p className="text-sm text-muted-foreground">
                    Cancel anytime. Deposits waived on Gold and above.
                  </p>
                </div>
                <SubscriptionPlans />
              </TabsContent>

              <TabsContent value="studio" className="mt-0 xl:hidden">
                <AIStudio
                  product={selected}
                  onRent={() => selected && addToCart(selected, 7)}
                  onSave={(look) => selected && handleSaveLook(selected, look)}
                  onShare={() => openAccount("lookbook")}
                />
              </TabsContent>

              <TabsContent value="studio" className="mt-0 hidden xl:block">
                <div className="grid gap-4 border border-border bg-card p-8">
                  <h2 className="font-display text-2xl">AI Fitting Room is live on the right →</h2>
                  <p className="text-sm text-muted-foreground">
                    Selected fit: {selected ? `${selected.title} — ${selected.designer}` : "none yet"}. Upload a
                    full-body photo in the studio panel to render your preview, then ask the stylist anything.
                  </p>
                  <Button className="w-fit rounded-none" variant="outline" onClick={() => setTab("feed")}>
                    Back to feed
                  </Button>
                </div>
              </TabsContent>
            </div>

            <div className="hidden xl:block">
              <div className="sticky top-[152px] h-[calc(100vh-176px)]">
                <AIStudio
                  product={selected}
                  onRent={() => selected && addToCart(selected, 7)}
                  onSave={(look) => selected && handleSaveLook(selected, look)}
                  onShare={() => openAccount("lookbook")}
                />
              </div>
            </div>
          </div>
        </Tabs>
      </main>

      <footer className="mt-10 border-t border-border bg-card">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-4 py-8 text-xs text-muted-foreground">
          <div>
            <p className="font-display text-xl text-foreground">DRIPPASS</p>
            <p className="tracking-luxe">WEAR. RETURN. REPEAT.</p>
          </div>
          <p>Sanitized rentals · Prepaid returns · Delivered across 14 cities</p>
        </div>
      </footer>

      <ProductModal
        product={selected}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onAddToCart={(days) => selected && addToCart(selected, days)}
        onTryOn={() => {
          setModalOpen(false);
          setTab("studio");
        }}
      />
      <CartSheet
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={cart}
        onRemove={(id) => setCart((c) => c.filter((i) => i.product.id !== id))}
      />
      <LookbookSheet
        open={accountOpen}
        onOpenChange={setAccountOpen}
        tab={accountTab}
        onTabChange={setAccountTab}
        wishlist={saved}
        looks={looks}
        onToggleWishlist={toggleSave}
        onRemoveLook={removeLook}
        onCaption={setCaption}
        onOpenProduct={(p) => {
          setSelected(p);
          setAccountOpen(false);
          setModalOpen(true);
        }}
      />
      <Toaster />
    </div>
  );
}
