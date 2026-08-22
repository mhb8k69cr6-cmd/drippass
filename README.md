# DripPass Style Studio

Build a modern, full-featured e-commerce fashion rental platform for "DRIPPASS" designed for Gen Z and young adults. The layout should follow the robust e-commerce architecture of platforms like Amazon/Flipkart, combined with a sleek Gen Z luxury aesthetic. Include a prominent, interactive AI Stylist & Virtual Try-On sidebar inspired by Lenskart.

---

### 1. Brand Identity & Visual Design

- Brand Name: DRIPPASS

- Tagline: "WEAR. RETURN. REPEAT."

- Aesthetic: Sophisticated yet vibrant luxury. Off-white/cream primary background (#F9F6F0), rich dark charcoal/black text (#1A1A1A), warm beige/taupe secondary accents (#D8C4B6), and energetic neon/gold accent buttons for CTAs.

- Logo Style: Elegant typography matching a luxury serif/sans motif with structured lines.

---

### 2. Layout & Page Structure (Amazon/Flipkart Style Architecture)

#### A. Header & Navigation (Top Bar)

- Main Header Bar:

  - DRIPPASS Logo & Tagline.

  - Location Selector / Pincode check (e.g., "Deliver to 110001 - Check availability").

  - Prominent Search Bar with auto-suggestions, category dropdown, and voice search icon.

  - Account/Profile menu, Subscription Tier status badge (e.g., "VIP Pass Active"), Saved Outfits/Wishlist, and Rental Cart with item counter.

- Category Navigation Bar (Mega Menu):

  - Categories: "New Drops", "Party & Clubbing", "Formals & Galas", "Streetwear", "Luxury Designer", "Subscription Plans", "Clearance Sale".

#### B. Main Layout (3-Column / Responsive Split)

- Left Sidebar (Filters): Category filters, size (XS to XXL), gender, event type, rental duration (3-day, 7-day, 14-day), brand, and price range.

- Center Feed (Product Grid):

  - Banner Carousel featuring upcoming fashion drops and trending event collections.

  - Grid of Product Cards showing: High-res outfit image, designer name, outfit title, original retail price vs. low rental price per day, availability status, user rating stars, and a "Try On in AI Studio" quick button.

- Right Column (AI Assistant & Virtual Fitting Room - Lenskart Style):

  - A persistent/collapsible right-hand panel titled "AI Fitting Room & Stylist".

---

### 3. Dedicated AI Assistant & Try-On Column (Lenskart Model)

Create a dedicated interactive widget on the right sidebar (or toggleable overlay):

- Header: "AI Visual Try-On Studio" with an active status badge.

- Step 1: User Image Input

  - Options: "Upload Your Full-Body Photo" or "Use Camera Feed".

  - Toggle switch for privacy: "Photos are stored locally on device".

- Step 2: Instant Fit Preview

  - Display a frame where the AI merges the selected outfit from the product feed onto the uploaded user image.

  - Slider control: "Adjust Fit / Lighting" and "Pose Variation".

- Step 3: AI Style Advisor Chatbot

  - Interactive chatbox beneath the preview canvas: "Ask AI Stylist" (e.g., "What shoes pair best with this jacket?", "Is this formal enough for a university gala?").

  - Quick action buttons: "Rent This Outfit", "Save Look to Lookbook", "Share Look on Instagram/TikTok".

---

### 4. Core Features & User Workflows

- Subscription Tier Banner: Highlight subscription plans (e.g., "Silver Pass: 2 outfits/mo", "Gold Pass: 4 outfits/mo", "Unlimited VIP Pass").

- Product Modal / Detail View:

  - Multi-angle gallery view.

  - Rental Date Picker (Select start and end dates with real-time price calculator).

  - Sanitization & Hygiene Guarantee Badge ("Dry-cleaned & disinfected before delivery").

  - Return Box inclusion note ("Includes prepaid return bag").

- Interactive Cart & Checkout:

  - Security deposit calculation, delivery slot selector, and subscription pass discount apply field.

---

### 5. Technical UI Stack Requirements

- Responsive mobile & desktop layout using Tailwind CSS.

- Interactive tab states for switching between "Browsing Feed", "Subscription Plans", and "AI Try-On Studio".

- Modern UI components using Radix/Shadcn components (Dialogs, Tooltips, Sliders, Dropdowns, Cards).

- Mock data filled with high-fashion streetwear, party wear, and formal wear outfit images.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://drippass.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2a1b44a5-bfef-4ec4-a7a3-110c89907a0f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Current backend status

The repository currently contains a frontend catalog and server functions for the optional AI stylist and caption tools. It does not contain a database, authentication provider, payment gateway, inventory service, or waitlist API. Rental cart, account, wishlist, and pass interactions therefore remain local UI state and must not be presented as completed bookings, payments, or persistent signups.

The AI stylist and caption functions use the server-only provider selected by `AI_PROVIDER`: Lovable (`LOVABLE_API_KEY`), Gemini (`GEMINI_API_KEY`), or local Ollama (`OLLAMA_BASE_URL` and `OLLAMA_MODEL`). The connector never sends keys to the browser. For local development, install Ollama, run `ollama pull llama3.2:3b`, and use `AI_PROVIDER=ollama`. Try-on image generation uses the server-only `GEMINI_API_KEY` and only runs after explicit photo consent. Persistent domain operations use Supabase through `SUPABASE_URL` and `SUPABASE_ANON_KEY`; the browser auth client uses the public `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Copy `.env.example` to a local environment file when configuring them. Apply `supabase/schema.sql` before enabling persistence.

To enable Google sign-in, set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` (or the legacy `VITE_SUPABASE_ANON_KEY`), enable Google under Supabase Authentication providers, and add `http://localhost:8080/` plus the deployed site URL to the Supabase redirect allow list.

## Verification

```sh
npm run typecheck
npm run lint
npm run build
```
