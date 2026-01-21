"use client";

import { Plus } from "lucide-react";
import InputField from "../../../components/global/InputField";
import TextAreaField from "../../../components/global/TextAreaField";
import CountryStateCity from "./CountryStateCity";
import { useState, useEffect } from "react";
import { supabase } from "@/src/lib/supabaseClient";
import { getCandidateIntro, updateIntroduction } from "@/src/lib/candidates";

type Introduction = {
  id: string;
  name: string;
  email: string;
  line: string;
  phone_number: string;
  to: string;
  address: string;
  country: string;
  state: string;
  city: string;
  about_yourself: string;
  cvFileName?: string;
};

export default function IntroductionSection() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [form, setForm] = useState<Introduction>({
    id: "",
    name: "",
    email: "",
    line: "",
    phone_number: "",
    to: "",
    address: "",
    country: "",
    state: "",
    city: "",
    about_yourself: "",
    cvFileName: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);

  /* ================= LOAD DATA ON LOGIN ================= */
  useEffect(() => {
    const loadProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      setUserId(user.id);

      const { data, error } = await getCandidateIntro(user.id);

      if (data) {
        setForm({
          id: user.id,
          name: data.full_name || "",
          email: user.email || "",
          phone_number: data.phone || "",
          to: data.date_of_birth || "",
          address: data.address || "",
          country: data.country || "",
          state: data.state || "",
          city: data.city || "",
          line: data.headline || "",
          about_yourself: data.summary || "",
          cvFileName: data.cv || "",
        });
        setMessage("Profile loaded successfully ✅");
      }
      setLoading(false);
    };
    loadProfile();
  }, []);

  /* ================= SAVE INTRO ================= */
  const addIntroductionHandler = async () => {
    if (!userId) return;

    const payload = {
      full_name: form.name,
      phone: form.phone_number,
      date_of_birth: form.to,
      country: form.country,
      state: form.state,
      city: form.city,
      address: form.address,
      headline: form.line,
      summary: form.about_yourself,
      cv: form.cvFileName || "",
    };

    try {
      // Check if candidate already exists
      const { data: existing, error: existErr } = await supabase
        .from("candidates")
        .select("user_id")
        .eq("user_id", userId)
        .maybeSingle();

      if (existErr) throw existErr;

      let res;
      if (existing) {
        // Update row
        res = await updateIntroduction(userId, payload);
        if (res.error) throw res.error;
      } else {
        // Insert new row
        res = await insertIntroduction(userId, payload);
        if (res.error) throw res.error;
      }

      setMessage("Introduction saved successfully ✅");
    } catch (err) {
      console.error("Save failed:", err);
      setMessage("Failed to save ❌");
    }
  };

  if (loading)
    return <p className="text-center text-gray-500">Loading profile...</p>;

  return (
    <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-8">
      <div className="flex items-center justify-between border-b pb-2">
        <h2 className="text-3xl text-gray-700 font-bold">Introduction</h2>
        <button
          onClick={addIntroductionHandler}
          className="flex items-center gap-2 bg-zinc-700 text-white px-4 py-2 rounded-lg hover:bg-zinc-900"
        >
          <Plus className="w-4 h-4" />
          Save
        </button>
      </div>

      {message && (
        <p className="text-sm text-green-600 font-medium">{message}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 rounded-lg bg-gray-50">
        <InputField
          placeholder="Name"
          value={form.name}
          setValue={(v) => setForm({ ...form, name: v })}
        />
        <InputField placeholder="Email" value={form.email} disabled />
        <InputField
          placeholder="Phone Number"
          value={form.phone_number}
          setValue={(v) => setForm({ ...form, phone_number: v })}
        />
        <InputField
          placeholder="Birth Date"
          value={form.to}
          setValue={(v) => setForm({ ...form, to: v })}
        />

        <CountryStateCity
          country={form.country}
          state={form.state}
          city={form.city}
          setCountry={(v) => setForm({ ...form, country: v })}
          setState={(v) => setForm({ ...form, state: v })}
          setCity={(v) => setForm({ ...form, city: v })}
        />

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-500 mb-2">
            Upload Your CV
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setCvFile(e.target.files[0]);
                setForm({ ...form, cvFileName: e.target.files[0].name });
              }
            }}
            className="w-full px-3 py-2 rounded-lg border"
          />
        </div>

        <TextAreaField
          className="md:col-span-2"
          placeholder="Address"
          rows={3}
          value={form.address}
          setValue={(v) => setForm({ ...form, address: v })}
        />
        <InputField
          className="md:col-span-2"
          placeholder="Headline"
          value={form.line}
          setValue={(v) => setForm({ ...form, line: v })}
        />
        <TextAreaField
          className="md:col-span-2"
          placeholder="About Yourself"
          rows={4}
          value={form.about_yourself}
          setValue={(v) => setForm({ ...form, about_yourself: v })}
        />
      </div>
    </section>
  );
}
