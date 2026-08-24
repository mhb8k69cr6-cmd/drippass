import { supabase } from "@/lib/supabase";

export async function currentAccessToken() {
  const session = await supabase?.auth.getSession();
  return session?.data.session?.access_token;
}