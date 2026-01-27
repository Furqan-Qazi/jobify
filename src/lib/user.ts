import { supabase } from "@/src/lib/supabaseClient";

export const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return { data, error };
};