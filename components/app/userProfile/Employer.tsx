"use client";

import { Edit, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import InputField from "../../global/InputField";
import TextAreaField from "../../global/TextAreaField";

import { supabase } from "@/src/lib/supabaseClient";
import {
  Employer,
  getCandidateEmployer,
  updateEmployer,
} from "@/src/lib/employer";

export default function EmployerSection() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [list, setList] = useState<Employer[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<Employer>({
    company_name: "",
    industry: "",
    company_size: "",
    website: "",
    description: "",
  });

  /* LOAD EMPLOYER */
  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        setLoading(false);
        return;
      }
      setUserId(data.user.id);

      const { data: employers } = await getCandidateEmployer(data.user.id);
      setList(employers || []);
      setLoading(false);
    };
    load();
  }, []);

  /* ADD / UPDATE LOCAL */
  const submitHandler = () => {
    if (!form.company_name) return;

    if (editingId) {
      setList((prev) =>
        prev.map((e) => (e.id === editingId ? { ...form, id: editingId } : e)),
      );
      setEditingId(null);
    } else {
      setList((prev) => [...prev, { ...form }]);
    }

    setForm({
      company_name: "",
      industry: "",
      company_size: "",
      website: "",
      description: "",
    });
    setShowForm(false);
  };

  /* EDIT LOCAL */
  const editHandler = (e: Employer) => {
    setForm(e);
    setEditingId(e.id || null);
    setShowForm(true);
  };

  /* DELETE LOCAL */
  const removeHandler = (id: string) => {
    setList((prev) => prev.filter((e) => e.id !== id));
  };

  /* SAVE TO DB */
  const saveHandler = async () => {
    if (!userId || list.length === 0) return;

    const { data, error } = await updateEmployer(list, userId);

    if (error) {
      setMessage("Save failed ❌");
    } else {
      setMessage("Saved successfully ✅");
      setList(data || []); // update list with actual UUIDs
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <section className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8 space-y-6">
      <div className="flex justify-between border-b pb-2">
        <h2 className="text-2xl font-bold">Employer</h2>
        <button
          onClick={saveHandler}
          className="bg-zinc-700 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>

      {message && <p className="text-green-600">{message}</p>}

      {/* LIST */}
      {list.length > 0 ? (
        list.map((e) => (
          <div key={e.id} className="flex justify-between border p-4 rounded">
            <div>
              <h3 className="font-semibold">{e.company_name}</h3>
              <p className="text-sm">{e.industry}</p>
              <p className="text-xs">{e.company_size}</p>
              {e.website && <p className="text-xs">{e.website}</p>}
              {e.description && <p className="text-sm mt-1">{e.description}</p>}
            </div>
            <div className="flex gap-2">
              <button onClick={() => editHandler(e)}>
                <Edit />
              </button>
              <button onClick={() => removeHandler(e.id || "")}>
                <Trash />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No employer added</p>
      )}

      {/* ADD BUTTON */}
      {!showForm && (
        <div
          onClick={() => setShowForm(true)}
          className="p-4 text-center ring-2 cursor-pointer rounded"
        >
          <Plus />
        </div>
      )}

      {/* FORM */}
      {showForm && (
        <>
          <div className="grid md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded">
            <InputField
              label="Company Name"
              value={form.company_name}
              setValue={(v) => setForm({ ...form, company_name: v })}
            />
            <InputField
              label="Industry"
              value={form.industry || ""}
              setValue={(v) => setForm({ ...form, industry: v })}
            />
            <InputField
              label="Company Size"
              value={form.company_size || ""}
              setValue={(v) => setForm({ ...form, company_size: v })}
            />
            <InputField
              label="Website"
              value={form.website || ""}
              setValue={(v) => setForm({ ...form, website: v })}
            />
            <TextAreaField
              className="md:col-span-2"
              placeholder="Description"
              value={form.description || ""}
              setValue={(v) => setForm({ ...form, description: v })}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={submitHandler}
              className="bg-zinc-700 text-white px-6 py-2 rounded"
            >
              {editingId ? "Update" : "Add"}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-zinc-300 px-6 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </section>
  );
}
