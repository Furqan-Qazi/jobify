import { supabase } from "@/src/lib/supabaseClient";

export async function createFirstAccount(): Promise<{
  error?: string;
  userId?: string;
}> {
  const { data, error } = await supabase.auth.signUp({
    email: "aj.aimaljan@gmail.com",
    password: "abd1234",
    options: {
      data: { full_name: "Aimal Jan" },
      emailRedirectTo:
        typeof window !== "undefined"
          ? `${window.location.origin}/app/dashboard`
          : undefined,
    },
  });

  if (error) return { error: error.message };
  return { userId: data.user?.id };
}

