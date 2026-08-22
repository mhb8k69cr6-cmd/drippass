import { createBrowserClient } from "@supabase/ssr";

const url = import.meta.env["VITE_SUPABASE_URL"];
const anonKey = import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ?? import.meta.env["VITE_SUPABASE_ANON_KEY"];

export const supabase = url && anonKey ? createBrowserClient(url, anonKey) : null;
