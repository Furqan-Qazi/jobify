import { supabase } from "./supabaseClient";

/* ================= TYPES ================= */

export type IntroductionPayload = {
  full_name: string;
  email?: string;
  user_id?: string;
  address: {
    phone?: string;
    date_of_birth?: string;
    country?: string;
    state?: string;
    city?: string;
    street?: string;
    headline?: string;
    about_yourself?: string;
    cvFileName?: string;
  };
};

/* ================= INTRO ================= */

export const getCandidateIntro = async (userId: string) => {
  const { data, error } = await supabase
    .from("candidates")
    .select("*")
    .eq("user_id", userId)
    .single();

  return { data, error };
};

export const updateIntroduction = async (
  userId: string,
  payload: IntroductionPayload,
) => {
  const { data, error } = await supabase
    .from("candidates")
    .update({
      full_name: payload.full_name,
      email: payload.email,
      address: payload.address,
    })
    .eq("user_id", userId)
    .select()
    .single();

  return { data, error };
};

export const insertIntroduction = async (
  userId: string,
  payload: IntroductionPayload,
) => {
  const { data, error } = await supabase
    .from("candidates")
    .insert([
      {
        user_id: userId,
        full_name: payload.full_name,
        email: payload.email,
        address: payload.address,
      },
    ])
    .select()
    .single();

  return { data, error };
};

/* ================= EDUCATION ================= */
export type Education = {
  id: string;
  school: string;
  degree: string;
  field: string;
  from: string;
  to: string;
  description: string;
};

export const getCandidateEducation = async (userId: string) => {
  const { data, error } = await supabase
    .from("candidates")
    .select("education")
    .eq("user_id", userId)
    .single();

  return { data, error };
};

export const updateEducation = async (
  education: Education[],
  userId: string,
) => {
  const { data, error } = await supabase
    .from("candidates")
    .update({ education })
    .eq("user_id", userId)
    .select();
  return { data, error };
};

/* ================= EXPERIENCE ================= */
export type Experience = {
  id: string;
  company: string;
  jobTitle: string;
  from: string;
  to: string;
  description: string;
};

export const getCandidateExperience = async (userId: string) => {
  const { data, error } = await supabase
    .from("candidates")
    .select("experience")
    .eq("user_id", userId)
    .single();
  return { data, error };
};

export const updateExperience = async (
  experience: Experience[],
  userId: string,
) => {
  return await supabase
    .from("candidates")
    .update({ experience })
    .eq("user_id", userId)
    .select();
};

/* ================= SKILLS ================= */
export const getCandidateSkills = async (userId: string) => {
  const { data, error } = await supabase
    .from("candidates")
    .select("skills")
    .eq("user_id", userId)
    .single();
  return { data, error };
};

export const updateSkills = async (skills: string[], userId: string) => {
  const { data, error } = await supabase
    .from("candidates")
    .update({ skills })
    .eq("user_id", userId)
    .select();
  return { data, error };
};
