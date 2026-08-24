import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateText } from "@/lib/ai-connector";
import { consumePassFeatureForToken } from "@/lib/pass.functions";

const StylistInput = z.object({
  question: z.string().min(1).max(500),
  outfit: z.string().max(200).optional(),
  accessToken: z.string().min(20),
  idempotencyKey: z.string().min(8).max(120),
});

export const askStylist = createServerFn({ method: "POST" })
  .validator((data: unknown) => StylistInput.parse(data))
  .handler(async ({ data }) => {
    const text = await generateText({
      system: "You are the DRIPPASS AI Stylist, a sharp Gen Z fashion advisor for a luxury outfit rental service. Give confident, specific styling advice: shoes, accessories, layering, dress-code fit. Keep answers under 90 words, no markdown headings, warm but editorial tone.",
      user: data.outfit ? `The user is currently previewing this rental: ${data.outfit}. Question: ${data.question}` : data.question,
    });

    let usage: { allowed: boolean };
    try {
      usage = await consumePassFeatureForToken(data.accessToken, "AI_STYLIST", data.idempotencyKey);
    } catch (error) {
      if (error instanceof Error && error.message === "Persistence service is not configured.") {
        usage = { allowed: true };
      } else {
        throw error;
      }
    }
    if (!usage.allowed) throw new Error("You've used your free AI Stylist session. Explore Passes to keep styling with AI.");

    return { reply: text.trim() || "Tell me a bit more about the occasion and I'll style it." };
  });
