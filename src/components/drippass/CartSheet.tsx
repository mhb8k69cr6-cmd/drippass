import { useState } from "react";
import { Trash2, Truck, Tag, ShieldCheck } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Product } from "@/data/products";
import { createSandboxOrder } from "@/lib/domain.functions";
import { currentAccessToken } from "@/lib/pass-client";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";

export type CartItem = { product: Product; days: number; size: string };

const SLOTS = ["Tomorrow · 9AM–12PM", "Tomorrow · 4PM–8PM", "Sat · 9AM–12PM", "Sat · 6PM–10PM"];

export function CartSheet({
  open,
  onOpenChange,
  items,
  onRemove,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  items: CartItem[];
  onRemove: (id: string) => void;
}) {
  const [slot, setSlot] = useState<string>(SLOTS[0]!);
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [checkoutState, setCheckoutState] = useState<"idle" | "processing" | "success" | "declined">("idle");
  const createOrder = useServerFn(createSandboxOrder);

  const rental = items.reduce((s, i) => s + i.product.perDay * i.days, 0);
  const deposit = items.reduce((s, i) => s + Math.round(i.product.retail * 0.1), 0);
  const total = Math.max(0, rental - discount) + deposit;
  const removeItem = (id: string) => {
    onRemove(id);
    window.localStorage.setItem("drippass.cart", JSON.stringify(items.filter((item) => item.product.id !== id)));
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 sm:max-w-md">
        <SheetHeader className="border-b border-border">
          <SheetTitle className="font-display text-xl">Rental Cart ({items.length})</SheetTitle>
        </SheetHeader>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {items.length === 0 && (
            <p className="pt-10 text-center text-sm text-muted-foreground">
              Your rack is empty. Add a fit to start the rotation.
            </p>
          )}
          {items.map(({ product, days }) => (
            <div key={product.id} className="flex gap-3 border border-border p-3">
              <img src={product.image} alt={product.title} className="h-24 w-20 object-cover" />
              <div className="flex-1 text-sm">
                <p className="text-[10px] tracking-luxe text-muted-foreground">{product.designer}</p>
                <p className="font-medium leading-snug">{product.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{days}-day rental</p>
                <p className="mt-1 font-display text-lg">
                  ₹{(product.perDay * days).toLocaleString("en-IN")}
                </p>
              </div>
              <button onClick={() => removeItem(product.id)} aria-label="Remove">
                <Trash2 className="size-4 text-muted-foreground hover:text-destructive" />
              </button>
            </div>
          ))}

          {items.length > 0 && (
            <>
              <div>
                <p className="mb-2 flex items-center gap-1.5 text-[10px] tracking-luxe text-muted-foreground">
                  <Truck className="size-3.5" /> DELIVERY SLOT
                </p>
                <Select value={slot} onValueChange={setSlot}>
                  <SelectTrigger className="rounded-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SLOTS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <p className="mb-2 flex items-center gap-1.5 text-[10px] tracking-luxe text-muted-foreground">
                  <Tag className="size-3.5" /> SUBSCRIPTION PASS DISCOUNT
                </p>
                <div className="flex gap-2">
                  <Input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="GOLDPASS"
                    className="rounded-none"
                  />
                  <Button
                    variant="outline"
                    className="rounded-none"
                    onClick={() => {
                      if (code.trim().toUpperCase() === "GOLDPASS") {
                        setDiscount(Math.round(rental * 0.25));
                        toast.success("Gold Pass applied — 25% off rental");
                      } else {
                        toast.error("Invalid pass code");
                      }
                    }}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="space-y-2 border-t border-border p-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Rental subtotal</span>
              <span>₹{rental.toLocaleString("en-IN")}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-gold">
                <span>Pass discount</span>
                <span>−₹{discount.toLocaleString("en-IN")}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Refundable security deposit</span>
              <span>₹{deposit.toLocaleString("en-IN")}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span className="font-display text-xl">₹{total.toLocaleString("en-IN")}</span>
            </div>
            <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <ShieldCheck className="size-3.5 text-gold" /> Sanitized, insured & prepaid return bag included
            </p>
            <Button
              className="w-full rounded-none bg-gradient-neon text-foreground hover:opacity-90"
              onClick={() => setCheckoutOpen(true)}
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </SheetContent>
      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="rounded-none sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rental checkout</DialogTitle>
            <DialogDescription>
              This is a mock payment walkthrough. No real payment is processed; a successful test creates a rental order.
            </DialogDescription>
          </DialogHeader>
          {checkoutState === "success" ? (
            <div className="border border-border p-4 text-sm">
              <p className="font-medium">Sandbox payment approved</p>
              <p className="mt-1 text-muted-foreground">No real payment was taken. Your rental order was recorded for this demo.</p>
            </div>
          ) : (
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                setCheckoutState("processing");
                void (async () => {
                  try {
                    if (cardNumber.replace(/\s/g, "").endsWith("0002")) throw new Error("Sandbox payment declined. Use another test card.");
                    const accessToken = await currentAccessToken();
                    if (!accessToken) throw new Error("Log in before checking out a rental.");
                    const start = new Date();
                    const end = new Date(start.getTime() + Math.max(1, Math.max(...items.map((item) => item.days))) * 86400000);
                    const result = await createOrder({
                      data: {
                        accessToken,
                        items: items.map(({ product, days, size }) => ({
                          productId: product.id,
                          slug: product.slug,
                          size,
                          start: start.toISOString().slice(0, 10),
                          end: new Date(start.getTime() + days * 86400000).toISOString().slice(0, 10),
                        })),
                      },
                    });
                    items.forEach((item) => onRemove(item.product.id));
                    window.localStorage.removeItem("drippass.cart");
                    setCheckoutState("success");
                    toast.success(`Rental order ${result.orderId.slice(0, 8)} confirmed.`);
                  } catch (error) {
                    setCheckoutState("declined");
                    toast.error(error instanceof Error ? error.message : "Rental checkout failed.");
                  }
                })();
              }}
            >
              <div className="space-y-1"><label htmlFor="sandbox-card" className="text-xs">Card number</label><Input id="sandbox-card" required inputMode="numeric" value={cardNumber} onChange={(event) => setCardNumber(event.target.value)} placeholder="4242 4242 4242 4242" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1"><label htmlFor="sandbox-expiry" className="text-xs">Expiry</label><Input id="sandbox-expiry" required placeholder="12/30" /></div>
                <div className="space-y-1"><label htmlFor="sandbox-cvc" className="text-xs">CVC</label><Input id="sandbox-cvc" required inputMode="numeric" placeholder="123" /></div>
              </div>
              {checkoutState === "declined" && <p className="text-sm text-destructive">Sandbox decline: use another test card number.</p>}
              <DialogFooter><Button type="submit" disabled={checkoutState === "processing"} className="rounded-none bg-gradient-neon text-foreground">{checkoutState === "processing" ? "Processing…" : "Run sandbox payment"}</Button></DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </Sheet>
  );
}
