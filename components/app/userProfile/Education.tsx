"use client";

import { Edit, Plus, Trash } from "lucide-react";
import InputField from "../../../components/global/InputField";
import TextAreaField from "../../../components/global/TextAreaField";
import { useState, useEffect } from "react";
import {
  Education,
  getCandidateEducation,
  updateEducation,
} from "@/src/lib/candidates";
import { supabase } from "@/src/lib/supabaseClient";

export default function EducationSection() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [addEducation, setAddEducation] = useState(false);
  const [list, setList] = useState<Education[]>([]);
  const [form, setForm] = useState<Education>({
    id: "",
    school: "",
    degree: "",
    field: "",
    from: "",
    to: "",
    description: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  // Load user + education on mount
  useEffect(() => {
    const loadEducation = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setUserId(user.id);

      const { data } = await getCandidateEducation(user.id);

      if (data?.education && Array.isArray(data.education)) {
        setList(data.education);
      } else {
        setList([]); // ensure list is always array
      }

      setLoading(false);
    };

    loadEducation();
  }, []);

  const addEducationHandler = () => {
    if (!form.school || !form.degree || !form.from) return;

    if (editingId) {
      setList((prev) =>
        prev.map((e) => (e.id === editingId ? { ...form, id: editingId } : e)),
      );
      setEditingId(null);
    } else {
      setList((prev) => [...prev, { ...form, id: Date.now().toString() }]);
    }

    setForm({
      id: "",
      school: "",
      degree: "",
      field: "",
      from: "",
      to: "",
      description: "",
    });
    setAddEducation(false);
  };

  const removeEducation = (id: string) => {
    setList((prev) => prev.filter((e) => e.id !== id));
  };

  const editEducation = (e: Education) => {
    setForm(e);
    setEditingId(e.id);
    setAddEducation(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const saveEducationHandler = async () => {
    if (!userId) return;
    const { error } = await updateEducation(list, userId);
    if (error) setMessage("Education save failed ❌");
    else setMessage("Education saved successfully ✅");
  };

  if (loading) return <p className="text-center">Loading education...</p>;

  return (
    <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-8">
      <div className="flex items-center justify-between border-b pb-2">
        <h2 className="text-3xl text-gray-700 font-bold">Education</h2>
        <button
          onClick={saveEducationHandler}
          className="flex items-center gap-2 bg-zinc-700 text-white px-4 py-2 rounded-lg hover:bg-zinc-900"
        >
          <Plus className="w-4 h-4" />
          Save
        </button>
      </div>

      {/* MESSAGE */}
      {message && <p className="text-green-500">{message}</p>}

      {/* LIST */}
      {Array.isArray(list) && list.length > 0 ? (
        list.map((e) => (
          <div
            key={e.id}
            className="flex justify-between items-start p-4 border rounded-lg hover:shadow-lg transition-shadow duration-300"
          >
            <div className="space-y-1">
              <h3 className="font-semibold text-gray-700 text-lg">
                {e.school}
              </h3>
              <p className="text-sm text-gray-700">
                {e.degree} — {e.field || "N/A"}
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
                onClick={() => editEducation(e)}
                className="text-blue-500 hover:text-blue-700"
              >
                <Edit />
              </button>
              <button
                onClick={() => removeEducation(e.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No education added yet.</p>
      )}

      {/* ADD BUTTON */}
      {!addEducation && (
        <div
          className="p-6 ring-2 hover:ring-lime-500 text-center bg-gray-50 rounded-lg cursor-pointer hover:shadow-md transition-all duration-300 text-zinc-700 hover:text-lime-500"
          onClick={() => setAddEducation(true)}
        >
          <Plus className="w-6 h-6 inline-block" />
        </div>
      )}

      {/* FORM */}
      {addEducation && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 rounded-lg bg-gray-50">
            <InputField
              label="School / University"
              placeholder="School / University"
              value={form.school}
              setValue={(value) => setForm({ ...form, school: value.toString() })}
            />
            <InputField
              placeholder="Degree"
              value={form.degree}
              setValue={(value) => setForm({ ...form, degree: value.toString() })}
            />
            <InputField
              className="md:col-span-2"
              placeholder="Field of Study"
              value={form.field}
              setValue={(value) => setForm({ ...form, field: value.toString() })}
            />
            <InputField
              placeholder="From (e.g. 2021)"
              value={form.from}
              setValue={(value) => setForm({ ...form, from: value.toString() })}
            />
            <InputField
              placeholder="To (e.g. 2025)"
              value={form.to}
              setValue={(value) => setForm({ ...form, to: value.toString() })}
            />
            <TextAreaField
              className="md:col-span-2"
              placeholder="Description / Achievements"
              rows={4}
              value={form.description}
              setValue={(value) => setForm({ ...form, description: value.toString() })}
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={addEducationHandler}
              className="flex items-center gap-2 bg-zinc-700 text-white px-6 py-3 rounded-lg hover:bg-zinc-900"
            >
              <Plus />
              {editingId ? "Update Education" : "Add Education"}
            </button>
            <button
              onClick={() => setAddEducation(false)}
              className="flex items-center gap-2 bg-zinc-300 text-zinc-700 px-6 py-3 rounded-lg hover:bg-zinc-100"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </section>
  );
}
