import { useState } from "react";
import { Copy, Instagram, Music2, Sparkles, Trash2, Loader2, Heart } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { generateCaption } from "@/lib/caption.functions";
import type { SavedLook } from "@/lib/lookbook";
import { PRODUCTS, type Product } from "@/data/products";
import { toast } from "sonner";

export function LookbookSheet({
  open,
  onOpenChange,
  tab,
  onTabChange,
  wishlist,
  looks,
  onToggleWishlist,
  onRemoveLook,
  onCaption,
  onOpenProduct,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  tab: string;
  onTabChange: (v: string) => void;
  wishlist: string[];
  looks: SavedLook[];
  onToggleWishlist: (id: string) => void;
  onRemoveLook: (id: string) => void;
  onCaption: (id: string, caption: string) => void;
  onOpenProduct: (p: Product) => void;
}) {
  const [pendingId, setPendingId] = useState<string | null>(null);
  const makeCaption = useServerFn(generateCaption);
  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const runCaption = async (look: SavedLook, platform: "instagram" | "tiktok") => {
    setPendingId(look.id + platform);
    try {
      const res = await makeCaption({
        data: {
          outfit: `${look.title} by ${look.designer} (${look.category})`,
          platform,
        },
      });
      onCaption(look.id, res.caption);
      toast.success(`${platform === "instagram" ? "Instagram" : "TikTok"} caption ready`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Caption failed");
    } finally {
      setPendingId(null);
    }
  };

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Caption copied");
    } catch {
      toast.error("Couldn't copy — select the text manually");
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border bg-gradient-luxe px-5 py-4 text-primary-foreground">
          <SheetTitle className="font-display text-lg text-primary-foreground">My Account</SheetTitle>
          <p className="text-[10px] tracking-luxe opacity-70">WISHLIST & AI LOOKBOOK</p>
        </SheetHeader>

        <Tabs value={tab} onValueChange={onTabChange} className="flex min-h-0 flex-1 flex-col">
          <TabsList className="m-4 grid grid-cols-2 rounded-none bg-muted p-1">
            <TabsTrigger value="wishlist" className="rounded-none text-xs">
              Wishlist ({savedProducts.length})
            </TabsTrigger>
            <TabsTrigger value="lookbook" className="rounded-none text-xs">
              Lookbook ({looks.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="wishlist" className="mt-0 flex-1 overflow-y-auto px-4 pb-6">
            {savedProducts.length === 0 ? (
              <p className="py-16 text-center text-sm text-muted-foreground">
                Nothing saved yet — tap the heart on any fit.
              </p>
            ) : (
              <div className="space-y-3">
                {savedProducts.map((p) => (
                  <div key={p.id} className="flex gap-3 border border-border bg-card p-3">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-24 w-20 shrink-0 object-cover"
                      loading="lazy"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] tracking-luxe text-muted-foreground">{p.designer}</p>
                      <p className="truncate text-sm font-medium">{p.title}</p>
                      <p className="font-display text-lg">
                        ₹{p.perDay}
                        <span className="font-sans text-[11px] text-muted-foreground"> / day</span>
                      </p>
                      <div className="mt-1.5 flex gap-2">
                        <Button
                          size="sm"
                          className="h-7 rounded-none bg-gradient-neon text-[11px] text-foreground"
                          onClick={() => onOpenProduct(p)}
                        >
                          Rent now
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 gap-1 rounded-none text-[11px]"
                          onClick={() => onToggleWishlist(p.id)}
                        >
                          <Heart className="size-3 fill-current" /> Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="lookbook" className="mt-0 flex-1 overflow-y-auto px-4 pb-6">
            {looks.length === 0 ? (
              <p className="py-16 text-center text-sm text-muted-foreground">
                No looks yet — style a fit in the AI Studio and hit “Save Look”.
              </p>
            ) : (
              <div className="space-y-4">
                {looks.map((look) => (
                  <div key={look.id} className="border border-border bg-card">
                    <div className="flex gap-3 p-3">
                      <div className="relative h-28 w-24 shrink-0 overflow-hidden bg-muted">
                        {look.photo && (
                          <img src={look.photo} alt="Try-on base" className="h-full w-full object-cover" />
                        )}
                        <img
                          src={look.image}
                          alt={look.title}
                          className="absolute inset-0 h-full w-full object-cover mix-blend-multiply"
                          style={{ opacity: look.photo ? look.fit / 100 : 1 }}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] tracking-luxe text-muted-foreground">{look.designer}</p>
                        <p className="truncate text-sm font-medium">{look.title}</p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          <Badge variant="outline" className="rounded-none text-[10px]">
                            Fit {look.fit}%
                          </Badge>
                          <Badge variant="outline" className="rounded-none text-[10px]">
                            Pose {look.pose}
                          </Badge>
                        </div>
                        <p className="mt-1 text-[10px] text-muted-foreground">
                          Saved {new Date(look.createdAt).toLocaleDateString("en-IN")}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemoveLook(look.id)}
                        aria-label="Delete look"
                        className="h-fit p-1 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>

                    <Separator />

                    <div className="space-y-2 p-3">
                      <p className="flex items-center gap-1 text-[10px] tracking-luxe text-muted-foreground">
                        <Sparkles className="size-3" /> AI SOCIAL CAPTION
                      </p>
                      {look.caption && (
                        <p className="whitespace-pre-line border border-border bg-muted/50 p-2 text-xs leading-relaxed">
                          {look.caption}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={pendingId !== null}
                          className="h-7 gap-1 rounded-none text-[11px]"
                          onClick={() => runCaption(look, "instagram")}
                        >
                          {pendingId === look.id + "instagram" ? (
                            <Loader2 className="size-3 animate-spin" />
                          ) : (
                            <Instagram className="size-3" />
                          )}
                          Instagram
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={pendingId !== null}
                          className="h-7 gap-1 rounded-none text-[11px]"
                          onClick={() => runCaption(look, "tiktok")}
                        >
                          {pendingId === look.id + "tiktok" ? (
                            <Loader2 className="size-3 animate-spin" />
                          ) : (
                            <Music2 className="size-3" />
                          )}
                          TikTok
                        </Button>
                        {look.caption && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 gap-1 rounded-none text-[11px]"
                            onClick={() => copy(look.caption!)}
                          >
                            <Copy className="size-3" /> Copy
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="managePass" className="mt-0 flex-1 overflow-y-auto px-4 pb-6">
            <div className="py-16 text-center text-sm text-muted-foreground">
              Manage your subscription pass and VIP benefits here.
              <div className="mt-4 space-y-2 text-left text-xs text-foreground">
                <p className="font-medium">Unlimited VIP Pass</p>
                <p>Swap access, instant delivery priority and exclusive styling perks.</p>
                <Button size="sm" className="rounded-none bg-gradient-neon text-foreground" onClick={() => window.location.assign("/passes")}>Manage Pass</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="returnPickups" className="mt-0 flex-1 overflow-y-auto px-4 pb-6">
            <div className="py-16 text-center text-sm text-muted-foreground">
              Schedule your return pickup or track existing orders.
              <div className="mt-4 space-y-2 text-left text-xs text-foreground">
                <p className="font-medium">Return Pickups</p>
                <p>We’ll collect your fit from the address on file at the next available slot.</p>
                <Button size="sm" className="rounded-none bg-gradient-neon text-foreground" onClick={() => toast("Pickup scheduling coming soon")}>Schedule pickup</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
