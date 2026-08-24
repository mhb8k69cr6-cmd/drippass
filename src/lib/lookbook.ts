import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

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
  const remoteUnavailable = useRef(typeof window !== "undefined" && window.localStorage.getItem("drippass.lookbook.remote-unavailable") === "true");

  const localKey = (userId: string, suffix: "looks" | "wishlist") => `drippass.${suffix}.${userId}`;

  useEffect(() => {
    const client = supabase;
    if (!client) return;
    let active = true;
    const load = async () => {
      const { data: auth } = await client.auth.getUser();
      if (!auth.user) return;
      const localLooks = () => {
        try {
          setWishlist(JSON.parse(window.localStorage.getItem(localKey(auth.user.id, "wishlist")) ?? "[]") as string[]);
          setLooks(JSON.parse(window.localStorage.getItem(localKey(auth.user.id, "looks")) ?? "[]") as SavedLook[]);
        } catch { /* use empty local state */ }
      };
      if (remoteUnavailable.current) { localLooks(); return; }
      const [{ data: wishlistRows, error: wishlistError }, { data: lookRows, error: lookbookError }] = await Promise.all([
        client.from("wishlist_items").select("product_id").eq("user_id", auth.user.id),
        client.from("lookbook_entries").select("*").eq("user_id", auth.user.id).order("created_at", { ascending: false }),
      ]);
      if (!active) return;
      if (wishlistError?.code === "PGRST205" || lookbookError?.code === "PGRST205") {
        remoteUnavailable.current = true;
        window.localStorage.setItem("drippass.lookbook.remote-unavailable", "true");
        localLooks();
        return;
      }
      setWishlist((wishlistRows ?? []).map((row) => String(row.product_id)));
      setLooks((lookRows ?? []).map((row) => ({
        id: String(row.id),
        productId: String(row.product_id),
        title: String(row.title),
        designer: String(row.designer),
        category: String(row.category),
        image: String(row.original_product_image_url ?? row.generated_image_url),
        photo: null,
        fit: 55,
        pose: 2,
        ...(row.caption ? { caption: String(row.caption) } : {}),
        createdAt: new Date(String(row.created_at)).getTime(),
      })));
    };
    void load();
    const { data } = client.auth.onAuthStateChange(() => void load());
    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((s) => {
      const exists = s.includes(id);
      const client = supabase;
      if (client && !remoteUnavailable.current) {
        void client.auth.getUser().then(({ data }) => {
          if (!data.user) return;
          if (exists) {
            void client.from("wishlist_items").delete().eq("user_id", data.user.id).eq("product_id", id);
          } else {
            void client.from("wishlist_items").insert({ user_id: data.user.id, product_id: id });
          }
          window.localStorage.setItem(localKey(data.user.id, "wishlist"), JSON.stringify(exists ? s.filter((x) => x !== id) : [...s, id]));
        });
      }
      return exists ? s.filter((x) => x !== id) : [...s, id];
    });
  }, []);

  const saveLook = useCallback(async (look: Omit<SavedLook, "id" | "createdAt">) => {
    const client = supabase;
    if (!client) throw new Error("Lookbook storage is not configured.");
    const { data: auth } = await client.auth.getUser();
    if (!auth.user) throw new Error("Log in to save a look to your lookbook.");
    const entry: SavedLook = {
      ...look,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    const { error } = remoteUnavailable.current ? { error: { code: "PGRST205", message: "Lookbook table is unavailable" } } : await client.from("lookbook_entries").insert({
      id: entry.id,
      user_id: auth.user.id,
      product_id: entry.productId,
      generated_image_url: entry.image,
      original_product_image_url: entry.image,
      title: entry.title,
      designer: entry.designer,
      category: entry.category,
    });
    if (error?.code === "PGRST205") {
      remoteUnavailable.current = true;
      const existing = JSON.parse(window.localStorage.getItem(localKey(auth.user.id, "looks")) ?? "[]") as SavedLook[];
      window.localStorage.setItem(localKey(auth.user.id, "looks"), JSON.stringify([entry, ...existing]));
    } else if (error) {
      throw new Error(`The look could not be saved to your lookbook: ${error.message}`);
    }
    if (!error) {
      const existing = JSON.parse(window.localStorage.getItem(localKey(auth.user.id, "looks")) ?? "[]") as SavedLook[];
      window.localStorage.setItem(localKey(auth.user.id, "looks"), JSON.stringify([entry, ...existing]));
    }
    setLooks((l) => [entry, ...l]);
    return entry;
  }, []);

  const removeLook = useCallback((id: string) => {
    setLooks((l) => l.filter((x) => x.id !== id));
    if (supabase) void supabase.from("lookbook_entries").delete().eq("id", id);
    if (supabase) void supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return;
      const key = localKey(data.user.id, "looks");
      const existing = JSON.parse(window.localStorage.getItem(key) ?? "[]") as SavedLook[];
      window.localStorage.setItem(key, JSON.stringify(existing.filter((look) => look.id !== id)));
    });
  }, []);

  const setCaption = useCallback((id: string, caption: string) => {
    setLooks((l) => l.map((x) => (x.id === id ? { ...x, caption } : x)));
    if (supabase) void supabase.from("lookbook_entries").update({ caption }).eq("id", id);
    if (supabase) void supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return;
      const key = localKey(data.user.id, "looks");
      const existing = JSON.parse(window.localStorage.getItem(key) ?? "[]") as SavedLook[];
      window.localStorage.setItem(key, JSON.stringify(existing.map((look) => look.id === id ? { ...look, caption } : look)));
    });
  }, []);

  return { wishlist, toggleWishlist, looks, saveLook, removeLook, setCaption };
}
