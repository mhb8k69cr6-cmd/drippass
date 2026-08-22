import { useCallback, useState } from "react";

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

export function useLookbook() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [looks, setLooks] = useState<SavedLook[]>([]);

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
