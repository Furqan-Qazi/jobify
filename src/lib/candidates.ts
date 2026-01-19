import { supabase } from "./supabaseClient";

export type Education = {
  id: string | null;
  school: string;
  degree: string;
  field: string;
  from: string;
  to: string;
  description: string;
}

export type Expereince = {
  user_id?: string | null;
  title: string;
  company: string;
  start_date: string;
  end_date: string;
}
export type Introduction = {
  user_id?: string | null;
  full_name: string;
  phone: string;
  date_of_birth: string;
  country: string;
  state: string;
  city: string;
  address: string;
  headline: string;
  summary: string;
  cv: string;
}

export type CandidateInsert = {
  full_name: string | object | null;
  email?: string | null;
  user_id?: string | null;
  created_at?: string | null;
  [key: string]: any;
};

export async function createCandidate(candidate: CandidateInsert) {
  const { data, error } = await supabase
    .from("candidates")
    .insert([candidate])
    .select()
    .single();
  return { data, error };
}

export async function updateIntroduction(introduction: Introduction) {
  const { data, error } = await supabase
    .from("candidates")
    .update({ introduction })
    .eq("user_id", introduction.user_id)
    .select()
    .single();
  return { data, error };
}
export async function updateEducation(education: Education[], user_id:string) {
  const { data, error } = await supabase
    .from("candidates")
    .update({ education })
    .eq("user_id", user_id)
    .select()
    .single();
  return { data, error };
}

export async function updateExperiece(experience: Expereince) {
  const { data, error } = await supabase
    .from("candidates")
    .update({ experience })
    .eq("user_id", experience.user_id)
    .select()
    .single();
  return { data, error };
}

export async function updateSkills(skills: string[], user_id:string) {
  const { data, error } = await supabase
    .from("candidates")
    .update({ skills })
    .eq("user_id", user_id)
    .select()
    .single();
  return { data, error };
}