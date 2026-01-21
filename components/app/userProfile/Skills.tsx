"use client";

import InputField from "@/components/global/InputField";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabaseClient";
import { updateSkills, getCandidateSkills } from "@/src/lib/candidates";

export default function SkillsSection() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [list, setList] = useState<string[]>([]);
  const [form, setForm] = useState("");

  /* ================= LOAD USER + SKILLS ================= */
  useEffect(() => {
    const loadSkills = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setUserId(user.id);

      const { data } = await getCandidateSkills(user.id);

      if (data?.skills && Array.isArray(data.skills)) {
        setList(data.skills);
      } else {
        setList([]);
      }

      setLoading(false);
    };

    loadSkills();
  }, []);

  /* ================= ADD (LOCAL) ================= */
  const addSkillHandler = () => {
    if (!form) return;
    if (list.includes(form)) return;

    setList((prev) => [...prev, form]);
    setForm("");
  };

  /* ================= DELETE (LOCAL) ================= */
  const removeSkill = (skill: string) => {
    setList((prev) => prev.filter((s) => s !== skill));
  };

  /* ================= SAVE (SUPABASE) ================= */
  const saveSkillsHandler = async () => {
    if (!userId) return;

    const { error } = await updateSkills(list, userId);

    if (error) setMessage("Skills save failed ❌");
    else setMessage("Skills saved successfully ✅");
  };

  if (loading) return <p className="text-center">Loading skills...</p>;

  return (
    <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-8">
      <div className="flex items-center justify-between border-b pb-2">
        <h2 className="text-3xl text-gray-700 font-bold">Skills</h2>

        <button
          onClick={saveSkillsHandler}
          className="flex items-center gap-2 bg-zinc-700 text-white px-4 py-2 rounded-lg hover:bg-zinc-900"
        >
          <Plus className="w-4 h-4" />
          Save
        </button>
      </div>

      {message && (
        <p className="text-sm text-green-600 font-medium">{message}</p>
      )}

      {/* LIST */}
      <div className="my-4 flex flex-wrap gap-2">
        {list.map((skill) => (
          <div
            key={skill}
            className="flex items-center gap-1 text-lime-700 bg-lime-100 px-4 py-2 rounded-full"
          >
            {skill}
            <span
              className="cursor-pointer hover:text-red-700"
              onClick={() => removeSkill(skill)}
            >
              <X className="h-4 w-4" />
            </span>
          </div>
        ))}
      </div>

      {/* FORM */}
      <div className="flex gap-4 bg-gray-50 p-6 items-end rounded-lg">
        <InputField
          label="Add Skill"
          placeholder="Type your skill"
          value={form}
          setValue={(value) => setForm(value.toString())}
        />

        <button
          onClick={addSkillHandler}
          className="flex items-center gap-2 bg-zinc-700 text-white px-6 py-3 rounded-lg hover:bg-zinc-900"
        >
          <Plus />
          Add
        </button>
      </div>
    </section>
  );
}
