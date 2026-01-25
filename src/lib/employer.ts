import { supabase } from "./supabaseClient";

export type Employer = {
  id?: string; // uuid
  company_name: string;
  industry?: string | null;
  company_size?: string | null;
  website?: string | null;
  description?: string | null;
};

/* GET EMPLOYERS */
export const getCandidateEmployer = async () => {
  const { data, error } = await supabase
    .from("employers")
    .select("*")
    .order("created_at", { ascending: false });
  return { data, error };
};

/* UPSERT / SAVE EMPLOYER */
export const saveEmployer = async (employers: Employer[]) => {
  // Ensure each row has id for upsert
  const payload = employers.map((e) => ({
    id: e.id || undefined, // undefined = insert new
    company_name: e.company_name,
    industry: e.industry || null,
    company_size: e.company_size || null,
    website: e.website || null,
    description: e.description || null,
  }));

  const { data, error } = await supabase
    .from("employers")
    .upsert(payload, { onConflict: "id" }) // upsert by id
    .select();

  return { data, error };
};

/* DELETE SINGLE EMPLOYER */
export const deleteEmployer = async (id: string) => {
  const { error } = await supabase.from("employers").delete().eq("id", id);

  return { error };
};
