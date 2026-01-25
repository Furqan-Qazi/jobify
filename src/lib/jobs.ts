import { supabase } from "./supabaseClient";

/* ================= TYPES ================= */
export type JobDB = {
  id?: string;
  job_title: string;
  company_name?: string;
  employment_type?: string;
  //   from?: string;
  salary_min?: number;
  salary_max?: number;
  location?: string;
  job_description?: string;
  employer_id?: string;
};

/* ================= JOBS ================= */

// Get all jobs for an employer
export const getJobs = async (employerId: string) => {
  return supabase
    .from("jobs")
    .select("*")
    .eq("employer_id", employerId)
    .order("created_at", { ascending: false });
};

// Add a new job
export const addJob = async (payload: JobDB) => {
  return supabase.from("jobs").insert([payload]).select().single();
};

// Update a job
export const updateJob = async (id: string, payload: JobDB) => {
  return supabase.from("jobs").update(payload).eq("id", id).select().single();
};

// Delete a job
export const deleteJob = async (id: string) => {
  return supabase.from("jobs").delete().eq("id", id);
};
