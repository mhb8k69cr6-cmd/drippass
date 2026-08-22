import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const TryOnInput = z.object({
  photoDataUrl: z.string().startsWith("data:image/").max(14_000_000),
  garment: z.string().min(1).max(200),
  consent: z.literal(true),
});

export const generateTryOn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => TryOnInput.parse(data))
  .handler(async ({ data }) => {
    const key = process.env["GEMINI_API_KEY"];
    if (!key) throw new Error("Try-on generation is not configured. Add GEMINI_API_KEY on the server.");
    const [, encoded] = data.photoDataUrl.split(",");
    if (!encoded) throw new Error("The uploaded image could not be read.");
    const mimeType = data.photoDataUrl.slice(5, data.photoDataUrl.indexOf(";"));
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${encodeURIComponent(key)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          role: "user",
          parts: [
            { text: `Preserve the person's face, identity, body proportions, pose, lighting, and background. Create a realistic fashion try-on image showing the person wearing this garment: ${data.garment}. Do not alter their identity. Return one edited image.` },
            { inline_data: { mime_type: mimeType, data: encoded } },
          ],
        }],
        generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
      }),
    });
    if (response.status === 400) throw new Error("Gemini rejected the image or request. Try a clear JPEG, PNG, or WEBP photo.");
    if (response.status === 429) throw new Error("Try-on generation is busy. Please try again shortly.");
    if (!response.ok) throw new Error("Try-on generation is temporarily unavailable.");
    const json = (await response.json()) as { candidates?: Array<{ content?: { parts?: Array<{ inline_data?: { mime_type?: string; data?: string } }> } }> };
    const image = json.candidates?.flatMap((candidate) => candidate.content?.parts ?? []).find((part) => part.inline_data?.data)?.inline_data;
    if (!image?.data) throw new Error("Gemini did not return an image. The request may have been safety-filtered.");
    return { imageDataUrl: `data:${image.mime_type ?? "image/png"};base64,${image.data}` };
  });
