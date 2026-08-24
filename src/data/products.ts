type DetailKey =
  | "DESCRIPTION"
  | "SIZES"
  | "CATEGORY"
  | "COLOR"
  | "MATERIAL"
  | "STOCK"
  | "SKU"
  | "TAGS"
  | "FEATURED"
  | "RENTAL_STATUS"
  | "RETAIL_PRICE";

import banner1 from "@/assets/banner-1.jpg";
import banner2 from "@/assets/banner-2.jpg";

export type Product = {
  slug: string;
  retailPrice: number;
  description: string;
  sizes: string[];
  category: string;
  color: string;
  material: string;
  stock: string;
  sku: string;
  tags: string[];
  featured: boolean;
  rentalStatus: "AVAILABLE" | "RESERVED" | "UNAVAILABLE";
  images: string[];
  rentalPricePerDay: number;
  id: string;
  title: string;
  designer: string;
  image: string;
  gallery: string[];
  gender: "Unisex";
  retail: number;
  perDay: number;
  rating: number;
  reviews: number;
  available: boolean;
  badge: string;
  event: string;
};

const DEMO_RETAIL_PRICE = 50000;
const productDetails = import.meta.glob("../../data/products/*/DETAILS.txt", {
  eager: true,
  import: "default",
  query: "?raw",
});
const productImages = import.meta.glob("../../data/products/**/*.{png,jpg,jpeg}", {
  eager: true,
  import: "default",
  query: "?url",
});

function parseDetails(source: string) {
  return source.split(/\r?\n/).reduce<Partial<Record<DetailKey, string>>>((fields, line) => {
    const separator = line.indexOf(":");
    if (separator < 0) return fields;
    const key = line.slice(0, separator).trim() as DetailKey;
    fields[key] = line.slice(separator + 1).trim();
    return fields;
  }, {});
}

function splitList(value: string | undefined) {
  return value?.split(",").map((item) => item.trim()).filter(Boolean) ?? [];
}

function stablePercentage(seed: string) {
  let hash = 0;
  for (const character of seed) hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  return 0.015 + (hash % 1501) / 100000;
}

function rentalPrice(retailPrice: number, sku: string) {
  return Math.max(299, Math.round((retailPrice * stablePercentage(sku)) / 50) * 50);
}

function imageUrlsForFolder(folder: string) {
  return Object.entries(productImages)
    .filter(([path]) => path.includes(`/${folder}/`))
    .map(([, image]) => image as string);
}

function displayTitle(folder: string) {
  return folder.replace(/-/g, " ");
}

function parseProduct(path: string, source: string): Product {
  const folder = path.split("/").at(-2) ?? "product";
  const fields = parseDetails(source);
  const images = imageUrlsForFolder(folder);
  const retailPrice = Number(fields.RETAIL_PRICE) || DEMO_RETAIL_PRICE;
  const tryOnImage = images.find((image) => image.toLowerCase().endsWith("/image.png")) ?? images[0] ?? "";
  const rentalStatus = fields.RENTAL_STATUS === "RESERVED" || fields.RENTAL_STATUS === "UNAVAILABLE"
    ? fields.RENTAL_STATUS
    : "AVAILABLE";

  return {
    slug: folder,
    retailPrice,
    description: fields.DESCRIPTION ?? "",
    sizes: splitList(fields.SIZES),
    category: fields.CATEGORY ?? "Uncategorized",
    color: fields.COLOR ?? "",
    material: fields.MATERIAL ?? "",
    stock: fields.STOCK ?? "",
    sku: fields.SKU ?? folder,
    tags: splitList(fields.TAGS),
    featured: fields.FEATURED?.toUpperCase() === "TRUE",
    rentalStatus,
    images,
    rentalPricePerDay: rentalPrice(retailPrice, fields.SKU ?? folder),
    id: fields.SKU ?? folder,
    title: displayTitle(folder),
    designer: fields.CATEGORY ?? "DRIPPASS",
    image: tryOnImage,
    gallery: images,
    gender: "Unisex",
    retail: retailPrice,
    perDay: rentalPrice(retailPrice, fields.SKU ?? folder),
    rating: 0,
    reviews: 0,
    available: rentalStatus === "AVAILABLE",
    badge: fields.FEATURED?.toUpperCase() === "TRUE" ? "FEATURED" : "",
    event: fields.CATEGORY ?? "",
  };
}

export const PRODUCTS = Object.entries(productDetails).map(([path, source]) =>
  parseProduct(path, source as string),
);

export const CATEGORIES = [...new Set(PRODUCTS.map((product) => product.category))];
export const EVENTS: string[] = [];
export const SIZES = [...new Set(PRODUCTS.flatMap((product) => product.sizes))];
export const DURATIONS = ["3-day", "7-day", "14-day"];
export const BRANDS: string[] = [];

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((product) => product.slug === slug);
}

export const BANNERS = [
  {
    image: banner1,
    kicker: "NEW ROTATION",
    title: "Your next look, ready.",
    copy: "Explore the latest pieces available to rent from DRIPPASS.",
    cta: "Shop the rotation",
  },
  {
    image: banner2,
    kicker: "STYLE ON DEMAND",
    title: "Wear more. Keep less.",
    copy: "Find a considered look for every occasion.",
    cta: "Explore the collection",
  },
];

