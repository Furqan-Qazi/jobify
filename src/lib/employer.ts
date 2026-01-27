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
export const getCandidateEmployer = async (userId:string) => {
  const { data, error } = await supabase
    .from("employers")
    .select("*")
    .order("created_at", { ascending: false })
    .eq("user_id", userId)
    .single();
  return { data, error };
};

/* UPSERT / SAVE EMPLOYER */
export const saveEmployer = async (employers: Employer, userId:string) => {
  const {data:userData, error:userError} = await getCandidateEmployer(userId);
  if (userError) {
    return { data: null, error: userError };
  }

  const payload = {
    company_name: employers.company_name,
    industry: employers.industry,
    company_size: employers.company_size,
    website: employers.website,
    description: employers.description,
    user_id: userId,
  };

  if(userData?.id) {
    const {data, error} = await supabase
      .from("employers")
      .update(payload)
      .eq("id", userData.id)
      .select();
    if (error) {
      return { data: null, error };
    }
    return { data, error: null };
  }
  
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
