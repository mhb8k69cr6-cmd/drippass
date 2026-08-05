import { useRef, useState } from "react";
import {
  Camera,
  Upload,
  Sparkles,
  Send,
  Instagram,
  Bookmark,
  ShoppingBag,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { askStylist } from "@/lib/stylist.functions";
import type { Product } from "@/data/products";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; text: string };

const QUICK_PROMPTS = [
  "What shoes pair best with this?",
  "Is this formal enough for a university gala?",
  "Suggest accessories under ₹2000",
];

export function AIStudio({
  product,
  onRent,
  onSave,
}: {
  product: Product | null;
  onRent: () => void;
  onSave: () => void;
}) {
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [fit, setFit] = useState(55);
  const [pose, setPose] = useState(2);
  const [localOnly, setLocalOnly] = useState(true);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Hey — I'm your DRIPPASS stylist. Pick a fit from the feed, drop a full-body photo, and ask me anything about styling it.",
    },
  ]);
  const fileRef = useRef<HTMLInputElement>(null);
  const send = useServerFn(askStylist);

  const handleFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setUserPhoto(String(reader.result));
    reader.readAsDataURL(file);
  };

  const ask = async (question: string) => {
    if (!question.trim() || pending) return;
    setMessages((m) => [...m, { role: "user", text: question }]);
    setInput("");
    setPending(true);
    try {
      const res = await send({
        data: {
          question,
          outfit: product ? `${product.title} by ${product.designer} (${product.category})` : undefined,
        },
      });
      setMessages((m) => [...m, { role: "assistant", text: res.reply }]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "The stylist is unavailable.";
      toast.error(msg);
      setMessages((m) => [...m, { role: "assistant", text: msg }]);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex h-full flex-col border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border bg-gradient-luxe px-4 py-3 text-primary-foreground">
        <div>
          <h2 className="font-display text-base leading-tight">AI Visual Try-On Studio</h2>
          <p className="text-[10px] tracking-luxe opacity-70">FITTING ROOM & STYLIST</p>
        </div>
        <Badge className="gap-1 rounded-none bg-neon text-[10px] text-neon-foreground">
          <span className="size-1.5 animate-pulse rounded-full bg-current" /> ACTIVE
        </Badge>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto p-4">
        {/* Step 1 */}
        <section>
          <p className="mb-2 text-[10px] tracking-luxe text-muted-foreground">STEP 1 — YOUR PHOTO</p>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="h-auto flex-col gap-1 rounded-none py-3" onClick={() => fileRef.current?.click()}>
              <Upload className="size-4" />
              <span className="text-[11px]">Upload Photo</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col gap-1 rounded-none py-3"
              onClick={() => toast("Camera feed requested — allow access in your browser")}
            >
              <Camera className="size-4" />
              <span className="text-[11px]">Use Camera</span>
            </Button>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <div className="mt-3 flex items-center justify-between rounded-none border border-border px-3 py-2">
            <Label htmlFor="privacy" className="flex items-center gap-2 text-[11px] font-normal">
              <ShieldCheck className="size-3.5 text-gold" /> Photos stored locally on device
            </Label>
            <Switch id="privacy" checked={localOnly} onCheckedChange={setLocalOnly} />
          </div>
        </section>

        <Separator />

        {/* Step 2 */}
        <section>
          <p className="mb-2 text-[10px] tracking-luxe text-muted-foreground">STEP 2 — INSTANT FIT PREVIEW</p>
          <div className="relative aspect-[3/4] overflow-hidden border border-border bg-muted">
            {userPhoto ? (
              <img src={userPhoto} alt="Your uploaded try-on base" className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full place-items-center px-6 text-center text-xs text-muted-foreground">
                Upload a full-body photo to render your fit preview
              </div>
            )}
            {product && (
              <img
                src={product.image}
                alt={`${product.title} overlay`}
                className="pointer-events-none absolute inset-0 h-full w-full object-cover mix-blend-multiply"
                style={{ opacity: userPhoto ? fit / 100 : 1, filter: `contrast(${90 + pose * 5}%)` }}
              />
            )}
            {product && (
              <div className="absolute inset-x-0 bottom-0 bg-background/90 px-3 py-2 backdrop-blur">
                <p className="truncate text-[11px] font-medium">{product.title}</p>
                <p className="text-[10px] text-muted-foreground">{product.designer}</p>
              </div>
            )}
          </div>

          <div className="mt-3 space-y-3">
            <div>
              <p className="mb-1.5 flex justify-between text-[11px] text-muted-foreground">
                <span>Adjust Fit / Lighting</span>
                <span>{fit}%</span>
              </p>
              <Slider value={[fit]} min={10} max={100} step={1} onValueChange={(v) => setFit(v[0] ?? 55)} />
            </div>
            <div>
              <p className="mb-1.5 flex justify-between text-[11px] text-muted-foreground">
                <span>Pose Variation</span>
                <span>Pose {pose}</span>
              </p>
              <Slider value={[pose]} min={1} max={4} step={1} onValueChange={(v) => setPose(v[0] ?? 1)} />
            </div>
          </div>
        </section>

        <Separator />

        {/* Step 3 */}
        <section>
          <p className="mb-2 text-[10px] tracking-luxe text-muted-foreground">STEP 3 — ASK AI STYLIST</p>
          <div className="space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "ml-auto w-fit max-w-[85%] bg-foreground px-3 py-2 text-xs text-background"
                    : "max-w-[95%] text-xs leading-relaxed text-foreground"
                }
              >
                {m.text}
              </div>
            ))}
            {pending && (
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Loader2 className="size-3 animate-spin" /> Styling your look…
              </p>
            )}
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {QUICK_PROMPTS.map((q) => (
              <button
                key={q}
                onClick={() => ask(q)}
                className="border border-border px-2 py-1 text-[10px] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                {q}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="mt-3 flex items-end gap-2"
          >
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  ask(input);
                }
              }}
              rows={2}
              placeholder="Ask AI Stylist…"
              className="min-h-0 resize-none rounded-none text-xs"
            />
            <Button type="submit" size="icon" disabled={pending} className="rounded-none bg-gradient-neon text-foreground">
              <Send className="size-4" />
            </Button>
          </form>
        </section>
      </div>

      <div className="grid gap-2 border-t border-border p-4">
        <Button onClick={onRent} disabled={!product} className="w-full gap-2 rounded-none bg-gradient-neon text-foreground hover:opacity-90">
          <ShoppingBag className="size-4" /> Rent This Outfit
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={onSave} disabled={!product} className="gap-1.5 rounded-none text-xs">
            <Bookmark className="size-3.5" /> Save Look
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.success("Look copied — share it on Instagram or TikTok")}
            className="gap-1.5 rounded-none text-xs"
          >
            <Instagram className="size-3.5" /> Share Look
          </Button>
        </div>
        <p className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
          <Sparkles className="size-3" /> Powered by DRIPPASS AI
        </p>
      </div>
    </div>
  );
}
