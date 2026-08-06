import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const CaptionInput = z.object({
  outfit: z.string().min(1).max(200),
  platform: z.enum(["instagram", "tiktok"]),
  vibe: z.string().max(120).optional(),
});

export const generateCaption = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => CaptionInput.parse(data))
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
              "You write short, punchy Gen Z social captions for DRIPPASS, a designer outfit rental service. Return ONLY the caption: one or two lines of copy, then 5-7 relevant hashtags on a new line (always include #DRIPPASS and #RentedNotBought). Instagram = editorial and aspirational; TikTok = playful, hook-first. No quotes, no markdown, under 45 words total.",
          },
          {
            role: "user",
            content: `Platform: ${data.platform}. Outfit: ${data.outfit}.${
              data.vibe ? ` Vibe: ${data.vibe}.` : ""
            }`,
          },
        ],
      }),
    });

    if (response.status === 429) throw new Error("Caption studio is busy — try again shortly.");
    if (response.status === 402) throw new Error("AI credits exhausted. Add credits to keep captioning.");
    if (!response.ok) throw new Error("Could not generate a caption right now.");

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

    return { caption: text.trim() || "Rented the look, kept the moment.\n#DRIPPASS #RentedNotBought" };
  });
