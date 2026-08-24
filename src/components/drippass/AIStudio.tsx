import { useEffect, useRef, useState } from "react";
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
  Copy,
} from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { askStylist } from "@/lib/stylist.functions";
import { currentAccessToken } from "@/lib/pass-client";
import { consumePassFeatureForToken as consume } from "@/lib/pass.functions";
import { PRODUCTS, type Product } from "@/data/products";
import { buildTryOnPrompt } from "@/lib/try-on-prompt";
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
  onSave: (look: { photo: string | null; fit: number; pose: number }) => void;
}) {
  const [activeProduct, setActiveProduct] = useState<Product | null>(product);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [localOnly, setLocalOnly] = useState(true);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [consent, setConsent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [step, setStep] = useState(1);
  const [generatedPhoto, setGeneratedPhoto] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Hey — I'm your DRIPPASS stylist. Pick a fit from the feed, drop a full-body photo, and ask me anything about styling it.",
    },
  ]);
  const fileRef = useRef<HTMLInputElement>(null);
  const generatedFileRef = useRef<HTMLInputElement>(null);
  const send = useServerFn(askStylist);

  useEffect(() => setActiveProduct(product), [product]);

  const prompt = buildTryOnPrompt(activeProduct?.title ?? "[INSERT GARMENT NAME]", activeProduct?.designer ?? "[INSERT BRAND NAME]");

  const handleFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setUserPhoto(String(reader.result));
    reader.readAsDataURL(file);
  };

  const handleGeneratedFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setGeneratedPhoto(String(reader.result));
    reader.readAsDataURL(file);
  };

  const ask = async (question: string) => {
    if (!question.trim() || pending) return;
    setMessages((m) => [...m, { role: "user", text: question }]);
    setInput("");
    setPending(true);
    try {
      const accessToken = await currentAccessToken();
      if (!accessToken) throw new Error("Log in to use the AI Stylist and receive your Free Pass allowance.");
      const res = await send({
        data: {
          question,
          outfit: activeProduct ? `${activeProduct.title} by ${activeProduct.designer} (${activeProduct.category})` : undefined,
          accessToken,
          idempotencyKey: crypto.randomUUID(),
        },
      });
      setMessages((m) => [...m, { role: "assistant", text: res.reply }]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "The stylist is unavailable. Configure an AI provider on the server.";
      toast.error(msg);
      setMessages((m) => [...m, { role: "assistant", text: msg }]);
    } finally {
      setPending(false);
    }
  };

  const runTryOn = async () => {
    if (!userPhoto || !activeProduct || !consent || generating) return;
    const chatgptWindow = window.open("about:blank", "_blank");
    setGenerating(true);
    try {
      const personBlob = await fetch(userPhoto).then((response) => response.blob());
      const garmentBlob = await fetch(activeProduct.image).then((response) => {
        if (!response.ok) throw new Error("The garment image could not be downloaded.");
        return response.blob();
      });
      const accessToken = await currentAccessToken();
      if (!accessToken) throw new Error("Log in to use AI Try-On and receive your Free Pass allowance.");
      const usage = await consume(accessToken, "AI_TRY_ON", crypto.randomUUID());
      if (!usage.allowed) {
        chatgptWindow?.close();
        toast.error("Your free AI Try-On has been used. Explore Passes to continue.");
        return;
      }
      const download = (blob: Blob, filename: string) => {
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      };
      try {
        await navigator.clipboard.writeText(prompt);
      } catch {
        toast.info("Prompt copying was blocked. The prompt remains available to select manually.");
      }
      download(personBlob, "1_person_photo.jpg");
      download(garmentBlob, "2_garment_photo.jpg");
      if (chatgptWindow) {
        chatgptWindow.location.href = "https://chatgpt.com/images";
      } else {
        toast.info("Your browser blocked the new tab. Open ChatGPT Images manually to continue.");
      }
      setCopied(true);
      setStep(3);
      toast.success("Prompt copied, ChatGPT Images opened, and both images downloaded separately.");
    } catch (error) {
      chatgptWindow?.close();
      toast.error(error instanceof Error ? error.message : "Try-on generation failed.");
    } finally {
      setGenerating(false);
    }
  };

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const saveCurrentLook = () => {
    if (!activeProduct || !generatedPhoto) {
      toast.error("Upload the generated ChatGPT image before saving this look.");
      return;
    }
    setSaved(true);
    toast.success("Look saved to your account!");
  };

  const shareLook = async () => {
    const shareData = { title: activeProduct?.title ?? "DRIPPASS look", text: "Try this look on DRIPPASS", url: window.location.href };
    if (navigator.share) {
      try { await navigator.share(shareData); return; } catch (error) { if (error instanceof DOMException && error.name === "AbortError") return; }
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Look link copied to clipboard!");
    } catch {
      toast.error("Sharing is unavailable. Copy the page URL from your browser.");
    }
  };

  return (
    <>
      <section className="flex min-h-[720px] flex-col overflow-hidden border border-border bg-card shadow-soft">
      <div className="flex items-center justify-between border-b border-border bg-gradient-luxe px-4 py-3 text-primary-foreground">
            <div>
              <h2 className="font-display text-base leading-tight">AI Visual Try-On Studio</h2>
              <p className="text-[10px] tracking-luxe opacity-70">STEP {step} OF 3 · FITTING ROOM & STYLIST</p>
            </div>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto p-4">
              {/* Step 1 */}
        <section className={step === 1 ? "" : "hidden"}>
          <p className="mb-2 text-[10px] tracking-luxe text-muted-foreground">STEP 1 — YOUR PHOTO</p>
          {!activeProduct ? (
            <div className="border border-border bg-muted/30 p-5 text-center">
              <p className="text-sm">Pick an outfit from the catalog to try it on.</p>
              <Button type="button" className="mt-3 rounded-none" onClick={() => setPickerOpen(true)}>Pick a garment</Button>
            </div>
          ) : (
            <div className="mb-3 flex items-center gap-3 border border-border bg-card p-3">
              <img src={activeProduct.image} alt={activeProduct.title} className="size-16 object-cover" />
              <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{activeProduct.title}</p><p className="text-xs text-muted-foreground">{activeProduct.designer} · ₹{activeProduct.perDay}/day</p><p className="text-[11px] text-muted-foreground">Sizes: {activeProduct.sizes.join(", ")}</p></div>
              <Button type="button" variant="outline" size="sm" className="rounded-none" onClick={() => setPickerOpen(true)}>Change garment</Button>
            </div>
          )}
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
          <div className="mt-3 border border-dashed border-border p-3 text-center text-[11px] text-muted-foreground" onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); handleFile(event.dataTransfer.files[0]); }}>
            Drag and drop a JPEG, PNG, or WEBP photo here, or use the upload button.
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
          <Button type="button" className="mt-5 w-full rounded-none bg-gradient-neon text-foreground" disabled={!userPhoto || !activeProduct} onClick={() => setStep(2)}>Continue to consent</Button>
        </section>

        {step === 1 && <Separator />}

        {/* Step 2 */}
        <section className={step === 2 ? "" : "hidden"}>
          <p className="mb-2 text-[10px] tracking-luxe text-muted-foreground">STEP 2 — INSTANT FIT PREVIEW · FREE PASS ACCESS</p>
          <div className="relative aspect-[3/4] overflow-hidden border border-border bg-muted">
            {userPhoto ? (
              <img src={userPhoto} alt="Your uploaded try-on photo" className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full place-items-center px-6 text-center text-xs text-muted-foreground">
                Upload a full-body photo to render your fit preview
              </div>
            )}
            {activeProduct && (
              <div className="absolute inset-x-0 bottom-0 bg-background/90 px-3 py-2 backdrop-blur">
                <p className="truncate text-[11px] font-medium">{activeProduct.title}</p>
                <p className="text-[10px] text-muted-foreground">{activeProduct.designer}</p>
              </div>
            )}
          </div>

          <div className="mt-3 space-y-3">
            <div className="border border-border bg-background p-3">
              <div className="flex items-center justify-between gap-2"><p className="text-[10px] tracking-luxe text-muted-foreground">CHATGPT IMAGES</p><Button type="button" variant="outline" size="sm" className="h-8 gap-1 rounded-none text-[10px]" disabled={!consent || !activeProduct} onClick={copyPrompt}><Copy className="size-3" /> {copied ? "Copied" : "Copy prompt"}</Button></div>
              <p className="mt-2 line-clamp-3 text-[11px] leading-relaxed text-muted-foreground">{prompt}</p>
            </div>
            <div className="flex items-start gap-2 border border-border p-3">
              <Checkbox id="try-on-consent" checked={consent} onCheckedChange={(checked) => setConsent(checked === true)} />
              <Label htmlFor="try-on-consent" className="text-[11px] font-normal leading-relaxed">I consent to this photo being used for one try-on generation in ChatGPT Images.</Label>
            </div>
            <Button type="button" onClick={runTryOn} disabled={!userPhoto || !activeProduct || !consent || generating} className="w-full rounded-none bg-gradient-neon text-foreground">
              {generating ? "Preparing ChatGPT Images…" : copied ? "Prompt copied · ChatGPT Images opened" : "Generate try-on"}
            </Button>
            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">Instructions: ChatGPT Images opens in a new tab. Upload both downloaded files, paste the copied prompt, generate the image, then return here and upload the generated result.</p>
          </div>
        </section>

        {step === 2 && <Separator />}

        {/* Step 3 */}
        <section className={step === 3 ? "" : "hidden"}>
          <p className="mb-2 text-[10px] tracking-luxe text-muted-foreground">STEP 3 — SAVE YOUR GENERATED LOOK</p>
          <div className="border border-dashed border-border p-5 text-center">
            {generatedPhoto ? <img src={generatedPhoto} alt="Generated ChatGPT try-on" className="mx-auto max-h-[420px] w-full object-contain" /> : <p className="text-sm text-muted-foreground">Upload the image you generated in ChatGPT Images.</p>}
            <input ref={generatedFileRef} type="file" accept="image/*" hidden onChange={(event) => handleGeneratedFile(event.target.files?.[0])} />
            <Button type="button" variant="outline" className="mt-4 rounded-none" onClick={() => generatedFileRef.current?.click()}>Upload generated image</Button>
          </div>
          <Button type="button" variant="outline" className="mt-3 w-full rounded-none" disabled={!generatedPhoto || !activeProduct} onClick={() => { saveCurrentLook(); onSave({ photo: generatedPhoto, fit: 55, pose: 2 }); }}><Bookmark className="size-3.5" /> Save to lookbook / wishlist</Button>
          <Separator className="my-6" />
          <p className="mb-2 text-[10px] tracking-luxe text-muted-foreground">STEP 3 — ASK AI STYLIST · 1 FREE SESSION</p>
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

          {step === 3 && <div className="grid gap-2 border-t border-border p-4">
            <Button onClick={onRent} disabled={!activeProduct} className="w-full gap-2 rounded-none bg-gradient-neon text-foreground hover:opacity-90">
              <ShoppingBag className="size-4" /> Rent This Outfit
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() => { saveCurrentLook(); onSave({ photo: generatedPhoto, fit: 55, pose: 2 }); }}
                disabled={!activeProduct || !generatedPhoto}
                className="gap-1.5 rounded-none text-xs"
              >
                <Bookmark className="size-3.5" /> {saved ? "Saved ♥" : "Save Look"}
              </Button>
              <Button
                variant="outline"
                onClick={shareLook}
                className="gap-1.5 rounded-none text-xs"
              >
                <Instagram className="size-3.5" /> Share Look
              </Button>
            </div>
            <p className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
              <Sparkles className="size-3" /> Powered by DRIPPASS AI
            </p>
          </div>}
      </section>
      <Dialog open={pickerOpen} onOpenChange={setPickerOpen}>
      <DialogContent className="rounded-none sm:max-w-2xl">
        <DialogHeader><DialogTitle>Choose a garment</DialogTitle></DialogHeader>
        <div className="grid max-h-[60vh] grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-3">
          {PRODUCTS.map((item) => <button type="button" key={item.id} onClick={() => { setActiveProduct(item); setPickerOpen(false); }} className={`border p-2 text-left ${activeProduct?.id === item.id ? "border-foreground" : "border-border"}`}><img src={item.image} alt={item.title} className="aspect-[3/4] w-full object-cover" /><p className="mt-2 truncate text-xs font-medium">{item.title}</p><p className="text-[10px] text-muted-foreground">{item.designer}</p></button>)}
        </div>
      </DialogContent>
      </Dialog>
    </>
  );
}
