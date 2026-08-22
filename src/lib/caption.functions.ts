import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateText } from "@/lib/ai-connector";

const CaptionInput = z.object({
  outfit: z.string().min(1).max(200),
  platform: z.enum(["instagram", "tiktok"]),
  vibe: z.string().max(120).optional(),
});

export const generateCaption = createServerFn({ method: "POST" })
  .validator((data: unknown) => CaptionInput.parse(data))
  .handler(async ({ data }) => {
    const text = await generateText({
      system: "You write short, punchy Gen Z social captions for DRIPPASS, a designer outfit rental service. Return ONLY the caption: one or two lines of copy, then 5-7 relevant hashtags on a new line (always include #DRIPPASS and #RentedNotBought). Instagram = editorial and aspirational; TikTok = playful, hook-first. No quotes, no markdown, under 45 words total.",
      user: `Platform: ${data.platform}. Outfit: ${data.outfit}.${data.vibe ? ` Vibe: ${data.vibe}.` : ""}`,
    });

    return { caption: text.trim() || "Rented the look, kept the moment.\n#DRIPPASS #RentedNotBought" };
  });
