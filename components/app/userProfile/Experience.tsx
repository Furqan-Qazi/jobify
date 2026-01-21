"use client";

import { Edit, Plus, Trash } from "lucide-react";
import InputField from "../../../components/global/InputField";
import TextAreaField from "../../../components/global/TextAreaField";
import { useState, useEffect } from "react";
import {
  Experience,
  getCandidateExperience,
  updateExperience,
} from "@/src/lib/candidates";
import { supabase } from "@/src/lib/supabaseClient";

// type Experience = {
//   id: string;
//   company: string;
//   jobTitle: string;
//   from: string;
//   to: string;
//   description: string;
// };

export default function ExperienceSection() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [addExperience, setAddExperience] = useState(false);
  const [list, setList] = useState<Experience[]>([]);
  const [form, setForm] = useState<Experience>({
    id: "",
    company: "",
    jobTitle: "",
    from: "",
    to: "",
    description: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  // Load user + experience on mount
  useEffect(() => {
    const loadExperience = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setUserId(user.id);

      const { data } = await getCandidateExperience(user.id);

      if (data?.experience && Array.isArray(data.experience)) {
        setList(data.experience);
      } else {
        setList([]); // ensure list is always array
      }

      setLoading(false);
    };

    loadExperience();
  }, []);

  const addExperienceHandler = () => {
    if (!form.company || !form.jobTitle || !form.from) return;

    if (editingId) {
      // EDIT
      setList((prev) =>
        prev.map((e) => (e.id === editingId ? { ...form, id: editingId } : e)),
      );
      setEditingId(null);
    } else {
      setList((prev) => [...prev, { ...form, id: Date.now().toString() }]);
    }

    setForm({
      id: "",
      company: "",
      jobTitle: "",
      from: "",
      to: "",
      description: "",
    });

    setAddExperience(false);
  };

  const removeExperience = (id: string) => {
    setList((prev) => prev.filter((e) => e.id !== id));
  };

  const editExperience = (e: Experience) => {
    setForm(e);
    setEditingId(e.id);
    setAddExperience(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const saveExperienceHandler = async () => {
    if (!userId) return;
    const { error } = await updateExperience(list, userId);
    if (error) setMessage("Experience save failed ❌");
    else setMessage("Experience saved successfully ✅");
  };

  if (loading) return <p className="text-center">Loading experience...</p>;

  return (
    <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-8">
      <div className="flex items-center justify-between border-b pb-2">
        <h2 className="text-3xl text-gray-700 font-bold">Experience</h2>

        <button
          onClick={saveExperienceHandler}
          className="flex items-center gap-2 bg-zinc-700 text-white px-4 py-2 rounded-lg hover:bg-zinc-900"
        >
          <Plus className="w-4 h-4" />
          Save
        </button>
      </div>
      {/* LIST */}
      <div className="space-y-4">
        {list.map((e) => (
          <div
            key={e.id}
            className="flex justify-between items-start p-4 border rounded-lg hover:shadow-lg transition-shadow duration-300"
          >
            <div className="space-y-1">
              <h3 className="font-semibold text-gray-700 text-lg">
                {e.company}
              </h3>
              <p className="text-sm text-gray-700">
                {e.jobTitle} — {e.company || "N/A"}
              </p>
              <p className="text-xs text-gray-500">
                {e.from} – {e.to || "Present"}
              </p>
              {e.description && (
                <p className="text-sm mt-2 text-gray-500">{e.description}</p>
              )}
            </div>
            <div className="flex gap-2 mt-1">
              <button
                onClick={() => editExperience(e)}
                className="text-blue-500 hover:text-blue-700"
                title="Edit"
              >
                <Edit />
              </button>
              <button
                onClick={() => removeExperience(e.id)}
                className="text-red-500 hover:text-red-700"
                title="Remove"
              >
                <Trash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {!addExperience && (
        <div
          className="p-6 ring-2 hover:ring-lime-500 text-center bg-gray-50 rounded-lg cursor-pointer hover:shadow-md transition-all duration-300 text-zinc- hover:text-lime-500"
          onClick={() => setAddExperience(!addExperience)}
        >
          <Plus className="w-6 h-6 inline-block" />
        </div>
      )}

      {/* FORM */}
      {addExperience && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-10 p-6 rounded-lg bg-gray-50">
            <InputField
              label="Add another expereince"
              placeholder="Company Name"
              value={form.company}
              setValue={(value) =>
                setForm({ ...form, company: value.toString() })
              }
            />

            <InputField
              className="input mt-5"
              placeholder="Job Title"
              value={form.jobTitle}
              setValue={(value) =>
                setForm({ ...form, jobTitle: value.toString() })
              }
            />

            <InputField
              className="input"
              placeholder="From (e.g. 2021)"
              value={form.from}
              setValue={(value) => setForm({ ...form, from: value.toString() })}
            />

            <InputField
              className="input"
              placeholder="To (e.g. 2025)"
              value={form.to}
              setValue={(value) => setForm({ ...form, to: value.toString() })}
            />

            <TextAreaField
              className="input md:col-span-2"
              placeholder="Description / Responsibilities"
              rows={4}
              value={form.description}
              setValue={(value) =>
                setForm({ ...form, description: value.toString() })
              }
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={addExperienceHandler}
              className="flex items-center gap-2 bg-zinc-700 text-white px-6 py-3 rounded-lg"
            >
              <Plus />
              {editingId ? "Update Experience" : "Add Experience"}
            </button>

            <button
              onClick={() => setAddExperience(false)}
              className="flex items-center gap-2 bg-zinc-300 text-zinc-700 px-6 py-3 rounded-lg cursor-pointer hover:bg-zinc-100 transition-all"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </section>
  );
}
