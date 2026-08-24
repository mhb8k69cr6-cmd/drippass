import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createReview } from "@/lib/domain.functions";
import { currentAccessToken } from "@/lib/pass-client";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

type Review = {
  id: string;
  rating: number;
  body: string;
  display_name: string | null;
  created_at: string;
};

export function ReviewsSection({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState("5");
  const [body, setBody] = useState("");
  const [pending, setPending] = useState(false);
  const submitReview = useServerFn(createReview);

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    void supabase.from("reviews").select("id, rating, body, display_name, created_at").eq("product_id", productId).order("created_at", { ascending: false }).then(({ data }) => {
      if (active) setReviews((data ?? []) as Review[]);
    });
    return () => { active = false; };
  }, [productId]);

  const average = reviews.length ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length : 0;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (body.trim().length < 10) {
      toast.error("Write at least 10 characters about your experience.");
      return;
    }
    setPending(true);
    try {
      const accessToken = await currentAccessToken();
      if (!accessToken) throw new Error("Log in to submit a review.");
      await submitReview({ data: { accessToken, productId, rating: Number(rating), body: body.trim() } });
      setBody("");
      toast.success("Review submitted for moderation.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Review could not be submitted.");
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="mt-10 border-t border-border pt-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-luxe text-muted-foreground">REVIEWS</p>
          <h2 className="mt-2 font-display text-3xl">The fit, in practice.</h2>
        </div>
        <div className="text-right text-sm">
          <p className="flex items-center justify-end gap-1 font-medium">{average ? average.toFixed(1) : "No rating yet"} <Star className="size-4 fill-current" /></p>
          <p className="text-xs text-muted-foreground">{reviews.length} review{reviews.length === 1 ? "" : "s"} · community feedback</p>
        </div>
      </div>
      {reviews.length === 0 ? <p className="mt-6 text-sm text-muted-foreground">No reviews yet. Be the first renter to share fit, quality, and comfort notes.</p> : <div className="mt-6 grid gap-3 md:grid-cols-2">{reviews.map((review) => <article key={review.id} className="border border-border p-4"><p className="flex items-center gap-1 text-sm">{review.rating}/5 <Star className="size-3 fill-current" /></p><p className="mt-2 text-sm leading-relaxed">{review.body}</p><p className="mt-3 text-xs text-muted-foreground">{review.display_name || "DRIPPASS member"} · {new Date(review.created_at).toLocaleDateString("en-IN")}</p></article>)}</div>}
      <form className="mt-6 grid gap-3 border border-border p-4 md:max-w-xl" onSubmit={submit}>
        <p className="text-xs tracking-luxe text-muted-foreground">SHARE YOUR EXPERIENCE</p>
        <div className="grid grid-cols-[7rem_1fr] gap-3"><label htmlFor={`review-rating-${productId}`} className="self-center text-sm">Rating</label><Input id={`review-rating-${productId}`} type="number" min="1" max="5" value={rating} onChange={(event) => setRating(event.target.value)} /></div>
        <Textarea value={body} onChange={(event) => setBody(event.target.value)} placeholder="How did it fit and feel?" minLength={10} maxLength={2000} />
        <Button type="submit" disabled={pending} className="w-fit rounded-none bg-gradient-neon text-foreground">{pending ? "Submitting..." : "Submit review"}</Button>
        <p className="text-xs text-muted-foreground">Reviews are tied to completed rentals. This community feedback is not presented as verified until the rental check passes.</p>
      </form>
    </section>
  );
}
