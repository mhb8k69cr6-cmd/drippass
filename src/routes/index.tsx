import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

import { SiteHeader } from "@/components/drippass/SiteHeader";
import { FilterSidebar, DEFAULT_FILTERS, type Filters } from "@/components/drippass/FilterSidebar";
import { FilterBar } from "@/components/drippass/FilterBar";
import { ProductCard } from "@/components/drippass/ProductCard";
import { ProductModal } from "@/components/drippass/ProductModal";
import { CartSheet, type CartItem } from "@/components/drippass/CartSheet";
import { LookbookSheet } from "@/components/drippass/LookbookSheet";
import { useLookbook } from "@/lib/lookbook";
import { BANNERS, PRODUCTS, type Product } from "@/data/products";
import { DrippassLogo } from "@/components/drippass/DrippassLogo";
import { supabase } from "@/lib/supabase";

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

function filtersFromUrl(): Filters {
  if (typeof window === "undefined") return DEFAULT_FILTERS;
  const params = new URLSearchParams(window.location.search);
  return {
    ...DEFAULT_FILTERS,
    categories: params.getAll("category"),
    sizes: params.getAll("size"),
    brands: params.getAll("brand"),
    availableOnly: params.get("availability") === "available",
    maxPerDay: Number(params.get("maxPerDay")) || DEFAULT_FILTERS.maxPerDay,
  };
}

function Home() {
  const [category, setCategory] = useState("New Drops");
  const [filters, setFilters] = useState<Filters>(filtersFromUrl);
  const [sort, setSort] = useState("trending");
  const [selected, setSelected] = useState<Product | null>(PRODUCTS[0] ?? null);
  const [modalOpen, setModalOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(window.localStorage.getItem("drippass.cart") ?? "[]") as CartItem[]; } catch { return []; }
  });
  const { wishlist: saved, toggleWishlist: toggleSave, looks, saveLook, removeLook, setCaption } =
    useLookbook();
  const [accountOpen, setAccountOpen] = useState(false);
  const [accountTab, setAccountTab] = useState("wishlist");
  const [userName, setUserName] = useState<string | null>(null);
  const [location, setLocation] = useState(() => {
    if (typeof window === "undefined") return "110001, Delhi";
    return window.localStorage.getItem("drippass.location") ?? "110001, Delhi";
  });
  const [banner, setBanner] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [passesExpanded, setPassesExpanded] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.localStorage.getItem("drippass.passes-collapsed") !== "true";
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!supabase) return;
    void supabase.auth.getSession().then(({ data }) => {
      setUserName(data.session?.user.user_metadata["display_name"] ?? data.session?.user.email?.split("@")[0] ?? null);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserName(session?.user.user_metadata["display_name"] ?? session?.user.email?.split("@")[0] ?? null);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const syncCart = () => {
      try { setCart(JSON.parse(window.localStorage.getItem("drippass.cart") ?? "[]") as CartItem[]); } catch { setCart([]); }
      if (new URLSearchParams(window.location.search).get("cart") === "open") setCartOpen(true);
    };
    window.addEventListener("drippass:cart-updated", syncCart);
    syncCart();
    return () => window.removeEventListener("drippass:cart-updated", syncCart);
  }, []);

  const products = useMemo(() => {
    const list = PRODUCTS.filter((p) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          p.title.toLowerCase().includes(q) ||
          p.designer.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.event.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (filters.categories.length && !filters.categories.includes(p.category)) return false;
      if (filters.sizes.length && !filters.sizes.some((s) => p.sizes.includes(s))) return false;
      if (filters.genders.length && !filters.genders.includes(p.gender)) return false;
      if (filters.events.length && !filters.events.includes(p.event)) return false;
      if (filters.brands.length && !filters.brands.includes(p.designer)) return false;
      if (p.perDay > filters.maxPerDay) return false;
      if (filters.availableOnly && !p.available) return false;
      return true;
    });
    if (sort === "low") return [...list].sort((a, b) => a.perDay - b.perDay);
    if (sort === "high") return [...list].sort((a, b) => b.perDay - a.perDay);
    if (sort === "rating") return [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [filters, sort, searchQuery]);

  const updateFilters = (next: Filters) => {
    setFilters(next);
    const params = new URLSearchParams(window.location.search);
    params.delete("category");
    params.delete("size");
    params.delete("brand");
    next.categories.forEach((value) => params.append("category", value));
    next.sizes.forEach((value) => params.append("size", value));
    next.brands.forEach((value) => params.append("brand", value));
    next.availableOnly ? params.set("availability", "available") : params.delete("availability");
    next.maxPerDay === DEFAULT_FILTERS.maxPerDay ? params.delete("maxPerDay") : params.set("maxPerDay", String(next.maxPerDay));
    window.history.replaceState(null, "", `${window.location.pathname}${params.toString() ? `?${params}` : ""}`);
  };

  const addToCart = (product: Product, days: number, size: string) => {
    if (!product.available) {
      toast.error("Waitlist is unavailable: no persistence service is configured.");
      return;
    }
    setCart((c) => {
      const next = c.some((i) => i.product.id === product.id) ? c : [...c, { product, days, size }];
      window.localStorage.setItem("drippass.cart", JSON.stringify(next));
      return next;
    });
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

  const openAuth = () => void navigate({ to: "/login" });

  const logout = () => {
    void supabase?.auth.signOut();
    setUserName(null);
    toast.success("You have been logged out");
  };

  const openManagePass = () => {
    openAccount("managePass");
  };

  const openReturnPickups = () => {
    openAccount("returnPickups");
  };

  const active = BANNERS[banner]!;

  return (
    <div className="min-h-screen bg-background bg-grid-subtle">
      <SiteHeader
        cartCount={cart.length}
        wishlistCount={saved.length}
        activeCategory={category}
        onCategory={(c) => {
          setCategory(c);
          if (c !== "Subscription Plans") updateFilters({ ...filters, categories: [c] });
        }}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => {
          if (userName) openAccount("wishlist");
          else openAuth();
        }}
        onOpenLookbook={() => {
          if (userName) openAccount("lookbook");
          else openAuth();
        }}
        onSearch={(query) => {
          setSearchQuery(query);
        }}
        onLogin={userName ? logout : openAuth}
        location={location}
        onLocationChange={setLocation}
        onManagePass={() => {
          if (userName) openManagePass();
          else openAuth();
        }}
        onReturnPickups={() => {
          if (userName) openReturnPickups();
          else openAuth();
        }}
        {...(userName ? { userName } : {})}
      />

      <main className="mx-auto max-w-[1600px] px-4 py-5">
        <div>
          <div className="grid gap-6">
            <div className="min-w-0">
              <section className="mt-0 space-y-6">
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
                  <div className="min-w-0">
                    <p className="font-display text-lg">Rent more, pay less with a DRIPPASS</p>
                    {passesExpanded && <p className="text-xs text-muted-foreground">Silver 2 outfits/mo · Gold 4 outfits/mo · Unlimited VIP swaps</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="rounded-none" onClick={() => void navigate({ to: "/passes" })}>Compare passes</Button>
                    <Button variant="ghost" size="icon" className="size-9" onClick={() => setPassesExpanded((expanded) => { window.localStorage.setItem("drippass.passes-collapsed", String(!expanded)); return !expanded; })} aria-label={passesExpanded ? "Minimize pass promotion" : "Expand pass promotion"}>
                      {passesExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                    </Button>
                  </div>
                </section>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-1.5 rounded-none lg:hidden">
                          <SlidersHorizontal className="size-3.5" /> Filters
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="w-80 overflow-y-auto p-6">
                        <SheetTitle className="sr-only">Filters</SheetTitle>
                        <FilterSidebar filters={filters} onChange={updateFilters} />
                      </SheetContent>
                    </Sheet>
                    <Select value={sort} onValueChange={setSort}>
                      <SelectTrigger className="h-9 w-44 rounded-none text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trending">Sort: Trending</SelectItem>
                        <SelectItem value="low">Price: Low to High</SelectItem>
                        <SelectItem value="high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Top Rated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <FilterBar filters={filters} onChange={updateFilters} />
                </div>

                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl">
                    {searchQuery.trim() ? `Results for "${searchQuery}"` : category}
                  </h2>
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
                      href={`/rent/${p.slug}`}
                      onTryOn={() => {
                        setSelected(p);
                      }}
                    />
                  ))}
                </div>
                {products.length === 0 && (
                  <p className="py-16 text-center text-sm text-muted-foreground">
                    {searchQuery.trim()
                      ? `No fits match "${searchQuery}". Try another search or loosen your filters.`
                      : "No fits match these filters. Loosen them up."}
                  </p>
                )}
              </section>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-10 border-t border-border bg-card">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-4 py-8 text-xs text-muted-foreground">
          <DrippassLogo variant="footer" />
          <p>Sanitized rentals · Prepaid returns · Delivered across 14 cities</p>
        </div>
      </footer>

      <ProductModal
        product={selected}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onAddToCart={(days, size) => selected && addToCart(selected, days, size)}
        onTryOn={() => {
          setModalOpen(false);
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
