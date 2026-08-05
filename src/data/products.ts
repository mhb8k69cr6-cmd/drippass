import look1 from "@/assets/look-1.jpg";
import look2 from "@/assets/look-2.jpg";
import look3 from "@/assets/look-3.jpg";
import look4 from "@/assets/look-4.jpg";
import look5 from "@/assets/look-5.jpg";
import look6 from "@/assets/look-6.jpg";
import banner1 from "@/assets/banner-1.jpg";
import banner2 from "@/assets/banner-2.jpg";

export type Product = {
  id: string;
  title: string;
  designer: string;
  image: string;
  gallery: string[];
  category: string;
  gender: "Women" | "Men" | "Unisex";
  sizes: string[];
  retail: number;
  perDay: number;
  rating: number;
  reviews: number;
  available: boolean;
  badge?: string;
  event: string;
};

export const CATEGORIES = [
  "New Drops",
  "Party & Clubbing",
  "Formals & Galas",
  "Streetwear",
  "Luxury Designer",
  "Subscription Plans",
  "Clearance Sale",
];

export const EVENTS = ["Concert", "Gala", "Club Night", "Wedding", "Campus", "Brunch"];
export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
export const DURATIONS = ["3-day", "7-day", "14-day"];
export const BRANDS = ["MAISON NOIR", "ATELIER 9", "RIOT LABEL", "VELVET CULT", "KAI STUDIO"];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    title: "Emerald Sequin Slip Dress",
    designer: "VELVET CULT",
    image: look1,
    gallery: [look1, look4, look5],
    category: "Party & Clubbing",
    gender: "Women",
    sizes: ["XS", "S", "M", "L"],
    retail: 42000,
    perDay: 649,
    rating: 4.8,
    reviews: 214,
    available: true,
    badge: "TRENDING",
    event: "Club Night",
  },
  {
    id: "p2",
    title: "Oversized Moto Leather Set",
    designer: "RIOT LABEL",
    image: look2,
    gallery: [look2, look6, look3],
    category: "Streetwear",
    gender: "Unisex",
    sizes: ["S", "M", "L", "XL", "XXL"],
    retail: 68000,
    perDay: 899,
    rating: 4.6,
    reviews: 132,
    available: true,
    badge: "NEW DROP",
    event: "Concert",
  },
  {
    id: "p3",
    title: "Ivory Three-Piece Gala Tux",
    designer: "MAISON NOIR",
    image: look3,
    gallery: [look3, look6, look2],
    category: "Formals & Galas",
    gender: "Men",
    sizes: ["S", "M", "L", "XL"],
    retail: 95000,
    perDay: 1199,
    rating: 4.9,
    reviews: 88,
    available: true,
    badge: "VIP ONLY",
    event: "Gala",
  },
  {
    id: "p4",
    title: "Crimson Silk Column Gown",
    designer: "ATELIER 9",
    image: look4,
    gallery: [look4, look1, look5],
    category: "Luxury Designer",
    gender: "Women",
    sizes: ["XS", "S", "M"],
    retail: 128000,
    perDay: 1499,
    rating: 5.0,
    reviews: 61,
    available: false,
    badge: "WAITLIST",
    event: "Wedding",
  },
  {
    id: "p5",
    title: "Liquid Chrome Co-Ord",
    designer: "KAI STUDIO",
    image: look5,
    gallery: [look5, look1, look2],
    category: "Party & Clubbing",
    gender: "Women",
    sizes: ["XS", "S", "M", "L", "XL"],
    retail: 37000,
    perDay: 549,
    rating: 4.4,
    reviews: 176,
    available: true,
    event: "Club Night",
  },
  {
    id: "p6",
    title: "Camel Trench & Knit Layer",
    designer: "MAISON NOIR",
    image: look6,
    gallery: [look6, look3, look2],
    category: "New Drops",
    gender: "Unisex",
    sizes: ["S", "M", "L", "XL", "XXL"],
    retail: 54000,
    perDay: 599,
    rating: 4.7,
    reviews: 143,
    available: true,
    badge: "CAMPUS PICK",
    event: "Campus",
  },
];

export const BANNERS = [
  {
    image: banner1,
    kicker: "DROP 011 — LIVE NOW",
    title: "Gala Season, Rented.",
    copy: "Couture gowns and tuxedos from ₹649/day. Dry-cleaned, delivered, collected.",
    cta: "Shop Formals & Galas",
  },
  {
    image: banner2,
    kicker: "AFTER DARK COLLECTION",
    title: "Streetwear On Rotation.",
    copy: "Rotate 4 statement fits a month with the Gold Pass. No resale guilt.",
    cta: "Explore Streetwear",
  },
];

export const PLANS = [
  {
    name: "Silver Pass",
    price: 999,
    outfits: "2 outfits / month",
    perks: ["Free 3-day rentals", "Standard delivery", "Basic AI Stylist"],
    highlight: false,
  },
  {
    name: "Gold Pass",
    price: 1899,
    outfits: "4 outfits / month",
    perks: ["Free 7-day rentals", "Priority delivery slots", "Full AI Try-On Studio", "Zero security deposit"],
    highlight: true,
  },
  {
    name: "Unlimited VIP Pass",
    price: 3499,
    outfits: "Unlimited swaps",
    perks: [
      "Any duration, any label",
      "Same-day delivery in metros",
      "Early access to drops",
      "Personal human stylist call",
    ],
    highlight: false,
  },
];
