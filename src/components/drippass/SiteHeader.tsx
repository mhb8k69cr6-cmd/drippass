import { useState } from "react";
import {
  Search,
  MapPin,
  Heart,
  ShoppingBag,
  User,
  Mic,
  ChevronDown,
  Menu,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CATEGORIES } from "@/data/products";
import { toast } from "sonner";

const SUGGESTIONS = [
  "sequin dress for club night",
  "ivory tuxedo gala",
  "oversized leather jacket",
  "silk gown wedding guest",
];

type Props = {
  cartCount: number;
  wishlistCount: number;
  activeCategory: string;
  onCategory: (c: string) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenLookbook: () => void;
};

export function SiteHeader({
  cartCount,
  wishlistCount,
  activeCategory,
  onCategory,
  onOpenCart,
  onOpenWishlist,
  onOpenLookbook,
}: Props) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="bg-gradient-luxe px-4 py-1.5 text-center text-[11px] tracking-luxe text-primary-foreground">
        FREE PREPAID RETURN BAG · SANITIZED BEFORE EVERY DROP
      </div>

      <div className="mx-auto flex max-w-[1600px] items-center gap-3 px-4 py-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-6">
            <p className="font-display text-2xl">DRIPPASS</p>
            <nav className="mt-6 flex flex-col gap-1">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => onCategory(c)}
                  className="rounded-sm px-2 py-2 text-left text-sm hover:bg-muted"
                >
                  {c}
                </button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <a href="/" className="shrink-0 leading-none">
          <span className="font-display text-2xl font-bold tracking-tight">DRIPPASS</span>
          <span className="block text-[9px] tracking-luxe text-muted-foreground">
            WEAR. RETURN. REPEAT.
          </span>
        </a>

        <button
          onClick={() => toast("Serviceable in 110001 — same-day slots open")}
          className="hidden items-center gap-2 rounded-sm border border-border px-3 py-2 text-left text-xs hover:bg-muted md:flex"
        >
          <MapPin className="size-4 text-gold" />
          <span>
            <span className="block text-muted-foreground">Deliver to 110001</span>
            <span className="font-medium">Check availability</span>
          </span>
        </button>

        <div className="relative flex-1">
          <div className="flex items-center overflow-hidden rounded-sm border border-foreground/20 bg-card focus-within:border-foreground">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hidden items-center gap-1 border-r border-border px-3 py-2.5 text-xs text-muted-foreground sm:flex">
                  All Categories <ChevronDown className="size-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {CATEGORIES.map((c) => (
                  <DropdownMenuItem key={c} onClick={() => onCategory(c)}>
                    {c}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              placeholder="Search 12,400+ rentable fits, designers & events"
              className="h-11 border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
            <button
              onClick={() => toast("Listening… say a vibe, we'll style it")}
              className="px-3 text-muted-foreground hover:text-foreground"
              aria-label="Voice search"
            >
              <Mic className="size-4" />
            </button>
            <button
              className="flex h-11 items-center bg-gradient-neon px-5 text-foreground"
              aria-label="Search"
            >
              <Search className="size-4" />
            </button>
          </div>

          {focused && (
            <div className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-sm border border-border bg-popover shadow-soft">
              {SUGGESTIONS.filter((s) => s.includes(query.toLowerCase())).map((s) => (
                <button
                  key={s}
                  onMouseDown={() => setQuery(s)}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm hover:bg-muted"
                >
                  <Search className="size-3.5 text-muted-foreground" />
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <Badge className="hidden gap-1 bg-gold text-gold-foreground xl:flex">
          <Crown className="size-3" /> VIP Pass Active
        </Badge>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Account">
              <User />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Hey, Aanya</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onOpenWishlist}>My Wishlist</DropdownMenuItem>
            <DropdownMenuItem onClick={onOpenLookbook}>My Lookbook</DropdownMenuItem>
            <DropdownMenuItem>Manage Pass</DropdownMenuItem>
            <DropdownMenuItem>Return Pickups</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={onOpenWishlist}
          aria-label="Saved outfits"
        >
          <Heart />
          {wishlistCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 rounded-full bg-foreground px-1.5 text-[10px] text-background">
              {wishlistCount}
            </span>
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={onOpenCart}
          aria-label="Rental cart"
        >
          <ShoppingBag />
          {cartCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 rounded-full bg-gold px-1.5 text-[10px] text-gold-foreground">
              {cartCount}
            </span>
          )}
        </Button>
      </div>

      <nav className="hidden border-t border-border lg:block">
        <div className="mx-auto flex max-w-[1600px] items-center gap-1 px-4">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => onCategory(c)}
              className={`relative px-3 py-2.5 text-xs tracking-wide transition-colors hover:text-foreground ${
                activeCategory === c ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {c.toUpperCase()}
              {activeCategory === c && (
                <span className="absolute inset-x-3 bottom-0 h-0.5 bg-gradient-neon" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
