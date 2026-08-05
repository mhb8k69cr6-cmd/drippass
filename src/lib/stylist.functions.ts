import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const StylistInput = z.object({
  question: z.string().min(1).max(500),
  outfit: z.string().max(200).optional(),
});

export const askStylist = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => StylistInput.parse(data))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Lovable-API-Key": key },
      body: JSON.stringify({
        model: "openai/gpt-5.6-sol",
        stream: false,
        input: [
          {
            role: "system",
            content:
              "You are the DRIPPASS AI Stylist, a sharp Gen Z fashion advisor for a luxury outfit rental service. Give confident, specific styling advice: shoes, accessories, layering, dress-code fit. Keep answers under 90 words, no markdown headings, warm but editorial tone.",
          },
          {
            role: "user",
            content: data.outfit
              ? `The user is currently previewing this rental: ${data.outfit}. Question: ${data.question}`
              : data.question,
          },
        ],
      }),
    });

    if (response.status === 429) throw new Error("The stylist is busy right now — try again shortly.");
    if (response.status === 402) throw new Error("AI credits exhausted. Add credits to keep styling.");
    if (!response.ok) throw new Error("The stylist could not respond right now.");

    const json = (await response.json()) as {
      output_text?: string;
      output?: Array<{ content?: Array<{ text?: string }> }>;
    };

    const text =
      json.output_text ??
      json.output
        ?.flatMap((item) => item.content ?? [])
        .map((c) => c.text ?? "")
        .join("") ??
      "";

    return { reply: text.trim() || "Tell me a bit more about the occasion and I'll style it." };
  });
