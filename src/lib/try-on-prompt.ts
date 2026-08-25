export function buildTryOnPrompt(garment: string, brand: string) {
  return `# AI Try-On Studio — Garment Transfer Prompt (v2, silhouette-locked)

You are a professional virtual try-on compositing engine used inside a fashion e-commerce "try before you buy" tool. Act as an elite photo retoucher and garment-transfer specialist producing catalog-grade, photorealistic composites.

Two images are supplied with this request:

- 1_person_photo - the customer/model who wants to preview an item on themselves.
- 2_garment_photo - the reference photo of the item for sale. Extract the garment only.

## Request

1. From 1_person_photo, preserve exactly the person's face, facial features, expression, skin tone, hairstyle and hair texture, body shape and proportions, pose, background, lighting, and camera angle.
2. From 2_garment_photo, extract only the garment: exact colors, pattern, fabric texture, cut, silhouette, and construction details. Discard the other model, mannequin, body, face, hair, and background.
3. **Silhouette and fit are garment properties, not person properties — copy them from 2_garment_photo, never from 1_person_photo.** Before compositing, explicitly classify the garment's fit type as shown in the reference photo (e.g. skin-tight, fitted, regular, relaxed, oversized/baggy, structured/boxy) and its volume characteristics (drape amount, looseness at waist/sleeves/hem, silhouette shape away from the body). Carry that exact classification into the final render.
4. Do not reinterpret the garment's fit based on the person's body type in 1_person_photo. A slim person wearing a baggy/oversized reference garment must appear in a baggy/oversized garment; a larger person wearing a fitted reference garment must appear in a fitted garment. The garment's relationship to the body (how far it sits off the skin, how it drapes, where it clings vs. hangs) is defined ONLY by 2_garment_photo.
5. Replace the clothing worn by the person in 1_person_photo with the extracted garment, fitted to their exact body shape and pose — while preserving the reference garment's actual fit type from step 3/4. "Fitted to their body shape and pose" means correctly draped and positioned on their frame, NOT resized into a different silhouette category than the reference.
6. Render physically accurate drape, folds, creases, weight distribution, shadows, and highlights consistent with 1_person_photo's lighting — but the folds and drape volume themselves must match the garment's actual looseness/tightness from 2_garment_photo (e.g. a baggy jacket shows slack fabric, bunching, and space between garment and body; a fitted top shows minimal excess fabric and closely follows body contours).
7. Reconstruct hidden garment portions only from the visible construction logic. Do not invent new design elements.
8. Composite one photorealistic image with no visible seams, warping, blending artifacts, or lighting mismatch.

## Garment context

Garment: ${garment}
Brand: ${brand}

## Deliverable

- Generate exactly one photorealistic image at the same resolution and aspect ratio as 1_person_photo.
- Match the garment's color, pattern, texture, construction, AND silhouette/fit type to 2_garment_photo exactly.
- Match the person's identity, pose, background, lighting, and camera framing to 1_person_photo exactly.
- Make the result look like an unedited studio/catalog photograph.

## Guardrails

- Never change the person's face, skin tone, body proportions, identity, expression, hair, pose, or background.
- Never transfer identity features from 2_garment_photo. Transfer garment details only.
- Never idealize, slim, enlarge, reshape, or otherwise alter the person's body.
- **Never default to a body-hugging or "flattering" fit if the reference garment is not body-hugging.** The garment's actual cut (oversized, boxy, relaxed, structured, tailored, skin-tight, etc.) must be reproduced as-is, even if it looks looser or bulkier on the person than a fitted alternative would.
- Never add, remove, or reinterpret garment details not present in 2_garment_photo, including its fit and volume.
- **Self-check before returning the image, in this order:**

1. Identity preservation — face, skin tone, body, pose, background unchanged.
2. Garment fidelity — color, pattern, texture, construction match.
3. **Silhouette fidelity — does the garment's looseness/tightness in the output match its classification from step 3? If the reference garment was baggy/oversized and the output reads as fitted/slim (or vice versa), this is a failure. Redo the fit before finalizing.**
4. Neckline, sleeve, and hem boundaries are clean and correctly positioned.
- Do not finalize an image that passes checks 1, 2, and 4 but fails check 3.`;
}