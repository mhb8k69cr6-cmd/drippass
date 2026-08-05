import { useState } from "react";
import { format, addDays, differenceInCalendarDays } from "date-fns";
import { Star, ShieldCheck, Package, Sparkles, CalendarIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";
import type { DateRange } from "react-day-picker";

export function ProductModal({
  product,
  open,
  onOpenChange,
  onAddToCart,
  onTryOn,
}: {
  product: Product | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onAddToCart: (days: number) => void;
  onTryOn: () => void;
}) {
  const [active, setActive] = useState(0);
  const [range, setRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), 3),
    to: addDays(new Date(), 10),
  });
  const [size, setSize] = useState<string | null>(null);

  if (!product) return null;

  const days =
    range?.from && range?.to ? Math.max(1, differenceInCalendarDays(range.to, range.from)) : 7;
  const rental = days * product.perDay;
  const deposit = Math.round(product.retail * 0.1);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-5xl overflow-y-auto rounded-none p-0">
        <DialogTitle className="sr-only">{product.title}</DialogTitle>
        <div className="grid gap-0 md:grid-cols-2">
          <div className="bg-muted p-4">
            <div className="aspect-[3/4] overflow-hidden bg-background">
              <img
                src={product.gallery[active]}
                alt={`${product.title} angle ${active + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-3 flex gap-2">
              {product.gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={cn(
                    "h-20 w-16 overflow-hidden border",
                    i === active ? "border-foreground" : "border-transparent opacity-60",
                  )}
                >
                  <img src={g} alt={`Angle ${i + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 p-6">
            <div>
              <p className="text-[10px] tracking-luxe text-muted-foreground">{product.designer}</p>
              <h2 className="font-display text-3xl leading-tight">{product.title}</h2>
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span className="flex items-center gap-0.5 bg-foreground px-1.5 py-0.5 text-background">
                  {product.rating} <Star className="size-2.5 fill-current" />
                </span>
                <span className="text-muted-foreground">{product.reviews} verified renters</span>
                <Badge variant="outline" className="rounded-none">{product.event}</Badge>
              </div>
            </div>

            <div>
              <p className="text-xs text-muted-foreground line-through">
                Retail ₹{product.retail.toLocaleString("en-IN")}
              </p>
              <p className="font-display text-3xl">
                ₹{product.perDay}
                <span className="font-sans text-sm text-muted-foreground"> / day</span>
              </p>
            </div>

            <div>
              <p className="mb-2 text-[10px] tracking-luxe text-muted-foreground">SELECT SIZE</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={cn(
                      "h-9 w-11 border text-xs",
                      size === s ? "border-foreground bg-foreground text-background" : "border-border",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-[10px] tracking-luxe text-muted-foreground">RENTAL DATES</p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start gap-2 rounded-none font-normal">
                    <CalendarIcon className="size-4" />
                    {range?.from && range?.to
                      ? `${format(range.from, "d MMM")} → ${format(range.to, "d MMM")} · ${days} days`
                      : "Pick your rental window"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={range}
                    onSelect={setRange}
                    numberOfMonths={1}
                    disabled={{ before: new Date() }}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-1.5 border border-border p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Rental ({days} days × ₹{product.perDay})
                </span>
                <span>₹{rental.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Refundable deposit</span>
                <span>₹{deposit.toLocaleString("en-IN")}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total today</span>
                <span className="font-display text-lg">
                  ₹{(rental + deposit).toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <p className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-gold" />
                Dry-cleaned & disinfected before delivery
              </p>
              <p className="flex items-center gap-2">
                <Package className="size-4 text-gold" />
                Includes prepaid return bag & free pickup
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                className="flex-1 rounded-none bg-gradient-neon text-foreground hover:opacity-90"
                disabled={!product.available}
                onClick={() => onAddToCart(days)}
              >
                {product.available ? "Add to Rental Cart" : "Join Waitlist"}
              </Button>
              <Button variant="outline" className="gap-1.5 rounded-none" onClick={onTryOn}>
                <Sparkles className="size-4" /> Try On
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
