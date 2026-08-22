import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateText } from "@/lib/ai-connector";

const StylistInput = z.object({
  question: z.string().min(1).max(500),
  outfit: z.string().max(200).optional(),
});

export const askStylist = createServerFn({ method: "POST" })
  .validator((data: unknown) => StylistInput.parse(data))
  .handler(async ({ data }) => {
    const text = await generateText({
      system: "You are the DRIPPASS AI Stylist, a sharp Gen Z fashion advisor for a luxury outfit rental service. Give confident, specific styling advice: shoes, accessories, layering, dress-code fit. Keep answers under 90 words, no markdown headings, warm but editorial tone.",
      user: data.outfit ? `The user is currently previewing this rental: ${data.outfit}. Question: ${data.question}` : data.question,
    });

    return { reply: text.trim() || "Tell me a bit more about the occasion and I'll style it." };
  });
