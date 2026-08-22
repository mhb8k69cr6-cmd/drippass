import { Star, Sparkles, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/products";

export function ProductCard({
  product,
  onOpen,
  onTryOn,
  onSave,
  saved,
  href,
}: {
  product: Product;
  onOpen: () => void;
  onTryOn: () => void;
  onSave: () => void;
  saved: boolean;
  href?: string;
}) {
  return (
    <article className="group flex flex-col overflow-hidden border border-border bg-card transition-shadow hover:shadow-soft">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        {href ? (
          <a href={href} className="block h-full w-full" aria-label={`View ${product.title}`}>
            <img
              src={product.image}
              alt={`${product.title} by ${product.designer}`}
              loading="lazy"
              width={768}
              height={1024}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </a>
        ) : (
          <button onClick={onOpen} className="block h-full w-full">
            <img
              src={product.image}
              alt={`${product.title} by ${product.designer}`}
              loading="lazy"
              width={768}
              height={1024}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </button>
        )}
        {product.badge && (
          <Badge className="absolute left-3 top-3 rounded-none bg-foreground text-[10px] tracking-luxe text-background">
            {product.badge}
          </Badge>
        )}
        {!href && (
          <>
            <button
              onClick={onSave}
              aria-label="Save to lookbook"
              className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-background/90 backdrop-blur"
            >
              <Heart className={`size-4 ${saved ? "fill-destructive text-destructive" : ""}`} />
            </button>
            <Button
              onClick={onTryOn}
              size="sm"
              className="absolute inset-x-3 bottom-3 translate-y-2 gap-1.5 rounded-none bg-gradient-neon text-xs text-foreground opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
            >
              <Sparkles className="size-3.5" /> Try On in AI Studio
            </Button>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="text-[10px] tracking-luxe text-muted-foreground">{product.designer}</p>
        {href ? (
          <a href={href} className="text-left text-sm font-medium leading-snug hover:underline">
            {product.title}
          </a>
        ) : (
          <button onClick={onOpen} className="text-left text-sm font-medium leading-snug hover:underline">
            {product.title}
          </button>
        )}
        <div className="flex items-center gap-1 text-xs">
          <span className="flex items-center gap-0.5 bg-foreground px-1.5 py-0.5 text-background">
            {product.rating} <Star className="size-2.5 fill-current" />
          </span>
          <span className="text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="mt-auto pt-2">
          <p className="text-xs text-muted-foreground line-through">
            Retail ₹{product.retail.toLocaleString("en-IN")}
          </p>
          <p className="font-display text-xl">
            ₹{product.perDay}
            <span className="font-sans text-xs text-muted-foreground"> / day</span>
          </p>
          <p className={`mt-1 text-xs ${product.available ? "text-foreground" : "text-destructive"}`}>
            {product.available ? "● In stock — ships tomorrow" : "○ Sold out — join waitlist"}
          </p>
        </div>
      </div>
    </article>
  );
}
