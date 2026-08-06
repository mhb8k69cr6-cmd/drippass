import { useCallback, useEffect, useState } from "react";

export type SavedLook = {
  id: string;
  productId: string;
  title: string;
  designer: string;
  category: string;
  image: string;
  photo: string | null;
  fit: number;
  pose: number;
  caption?: string;
  createdAt: number;
};

const WISHLIST_KEY = "drippass.wishlist";
const LOOKBOOK_KEY = "drippass.lookbook";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota or private mode — keep in memory only */
  }
}

export function useLookbook() {
  const [hydrated, setHydrated] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [looks, setLooks] = useState<SavedLook[]>([]);

  useEffect(() => {
    setWishlist(read<string[]>(WISHLIST_KEY, []));
    setLooks(read<SavedLook[]>(LOOKBOOK_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) write(WISHLIST_KEY, wishlist);
  }, [wishlist, hydrated]);

  useEffect(() => {
    if (hydrated) write(LOOKBOOK_KEY, looks);
  }, [looks, hydrated]);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }, []);

  const saveLook = useCallback((look: Omit<SavedLook, "id" | "createdAt">) => {
    const entry: SavedLook = {
      ...look,
      id: `${look.productId}-${Date.now()}`,
      createdAt: Date.now(),
    };
    setLooks((l) => [entry, ...l]);
    return entry;
  }, []);

  const removeLook = useCallback((id: string) => {
    setLooks((l) => l.filter((x) => x.id !== id));
  }, []);

  const setCaption = useCallback((id: string, caption: string) => {
    setLooks((l) => l.map((x) => (x.id === id ? { ...x, caption } : x)));
  }, []);

  return { wishlist, toggleWishlist, looks, saveLook, removeLook, setCaption };
}
