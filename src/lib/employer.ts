import { supabase } from "./supabaseClient";

export type Employer = {
  id?: string; // uuid auto-generated
  user_id?: string;
  company_name: string;
  industry?: string | null;
  company_size?: string | null;
  website?: string | null;
  description?: string | null;
};

/* GET EMPLOYER */
export const getCandidateEmployer = async (userId: string) => {
  const { data, error } = await supabase
    .from("employers")
    .select("*")
    .eq("user_id", userId);

  if (error) console.log("GET Employer Error:", error);
  return { data, error };
};

/* SAVE / UPDATE EMPLOYER */
export const updateEmployer = async (employers: Employer[], userId: string) => {
  try {
    // DELETE old records
    const { error: deleteError } = await supabase
      .from("employers")
      .delete()
      .eq("user_id", userId);
    if (deleteError) {
      console.log("Delete Error:", deleteError);
      return { error: deleteError };
    }

    // Prepare payload
    const payload = employers.map((e) => ({
      user_id: userId, // if table has uuid, cast: supabase.rpc('uuid', userId)
      company_name: e.company_name,
      industry: e.industry ?? null,
      company_size: e.company_size ?? null,
      website: e.website ?? null,
      description: e.description ?? null,
    }));

    const { data, error } = await supabase
      .from("employers")
      .insert(payload)
      .select(); // select returns inserted rows including id

    if (error) {
      console.log("Insert Error:", error);
    }

    return { data, error };
  } catch (err) {
    console.log("Unexpected Error:", err);
    return { error: err };
  }
};
