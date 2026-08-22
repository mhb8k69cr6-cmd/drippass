import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, ExternalLink } from "lucide-react";
import { AIStudio } from "@/components/drippass/AIStudio";
import { PRODUCTS, getProductBySlug } from "@/data/products";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/try-on")({
  validateSearch: (search) => ({ product: typeof search.product === "string" ? search.product : undefined }),
  head: () => ({
    meta: [
      { title: "AI Try-On Studio | DRIPPASS" },
      { name: "description", content: "Preview a DRIPPASS garment with the AI Try-On Studio." },
    ],
  }),
  component: TryOnPage,
});

function TryOnPage() {
  const { product: productSlug } = Route.useSearch();
  const product = getProductBySlug(productSlug ?? "") ?? PRODUCTS[0] ?? null;
  const [copied, setCopied] = useState(false);
  const prompt = `[DRIPPASS VIRTUAL TRY-ON STUDIO — DUAL-IMAGE COMPOSITION PROMPT]\n\nCONTEXT & IMAGE IDENTIFICATION:\n- IMAGE 1 (or first attachment): The PERSON / SUBJECT. Preserve their exact face, natural skin tone, facial features, hair structure, body shape, posture, and original background environment.\n- IMAGE 2 (or second attachment): The TARGET GARMENT (${product?.title ?? "ACTIVE_PRODUCT_TITLE"} by ${product?.designer ?? "ACTIVE_BRAND"}).\n\nINSTRUCTIONS FOR GEMINI:\n1. Photorealistically apply the TARGET GARMENT from Image 2 onto the SUBJECT in Image 1.\n2. Replace only the clothing worn by the person in Image 1 with the exact garment shown in Image 2.\n3. Ensure natural fabric drapery, realistic seam alignments, correct body contours, and accurate light source matching based on Image 1's ambient lighting.\n4. DO NOT alter the face, body proportions, background, or identity of the person in Image 1.\n5. Render one single, ultra-realistic, high-resolution fashion output image.`;

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
      window.open("https://gemini.google.com/app", "_blank", "noopener,noreferrer");
      toast.success("Prompt copied to clipboard! Paste it directly into the Gemini window.");
    } catch {
      toast.error("Could not copy the prompt. Select the text and open Gemini manually.");
    }
  };

  return (
    <main className="min-h-screen bg-background px-4 py-10 pb-32 md:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs tracking-luxe text-muted-foreground">DRIPPASS STUDIO</p>
        <h1 className="mt-3 font-display text-4xl md:text-6xl">Try the look on.</h1>
        <p className="mt-4 max-w-xl text-sm text-muted-foreground">
          Upload a photo only when you are ready. AI image generation is unavailable until a server-side Gemini integration is configured.
        </p>
        <div className="mt-10">
          <section className="mb-6 border border-border bg-card p-5 shadow-soft">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs tracking-luxe text-muted-foreground">GEMINI HANDOFF</p>
                <h2 className="mt-2 font-display text-2xl">Bring your context with you.</h2>
                <p className="mt-2 max-w-2xl text-xs text-muted-foreground">Gemini's signed-in interface cannot be embedded safely inside another site. Copy this context prompt, open Gemini in a new tab, and attach your photo and garment references there.</p>
              </div>
              <Button type="button" className="gap-2 rounded-none bg-gradient-neon text-foreground" onClick={copyPrompt}><Copy className="size-4" /> {copied ? "Copied · Gemini opened" : "Copy prompt & open Gemini"}</Button>
            </div>
            <textarea readOnly value={prompt} aria-label="Copyable Gemini context prompt" className="mt-4 min-h-28 w-full resize-y border border-border bg-background p-3 text-xs leading-relaxed outline-none" />
            <a href="https://gemini.google.com/app" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-xs underline"><ExternalLink className="size-3.5" /> Open Gemini</a>
          </section>
          <AIStudio
            product={product}
            onRent={() => { if (product) window.location.assign(`/rent/${product.slug}`); }}
            onSave={() => undefined}
          />
        </div>
      </div>
    </main>
  );
}