"use client";

import { Edit, Plus, Trash } from "lucide-react";
import InputField from "../../../components/global/InputField";
import TextAreaField from "../../../components/global/TextAreaField";
import { useState } from "react";

type Job = {
  id: string;
  JobTittle: string;
  company_name: string;
  number_of_people_required: string;
  from: string;
  salary: string;
  location: string;
  JobDescription: string;
};

export default function JobPost() {
  const [addJob, setAddJob] = useState<boolean>(false);
  const [list, setList] = useState<Job[]>([]);
  const [form, setForm] = useState<Job>({
    id: "",
    JobTittle: "",
    company_name: "",
    number_of_people_required: "",
    from: "",
    salary: "",
    location: "",
    JobDescription: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const addJobHandler = () => {
    if (!form.JobTittle || !form.company_name || !form.from) return;

    if (editingId) {
      // EDIT
      setList((prev) =>
        prev.map((e) => (e.id === editingId ? { ...form, id: editingId } : e))
      );
      setEditingId(null);
    } else {
      setList((prev) => [...prev, { ...form, id: Date.now().toString() }]);
    }

    setForm({
      id: "",
      JobTittle: "",
      company_name: "",
      number_of_people_required: "",
      from: "",
      salary: "",
      location: "",
      JobDescription: "",
    });

    setAddJob(false);
  };

  const removeJob = (id: string) => {
    setList((prev) => prev.filter((e) => e.id !== id));
  };

  const editJob = (e: Job) => {
    setForm(e);
    setEditingId(e.id);
    setAddJob(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-8">
      <div className="flex items-center justify-between border-b pb-2">
        <h2 className="text-3xl text-gray-700 font-bold">Job</h2>

        <button
          onClick={addJobHandler}
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
                {e.JobTittle}
              </h3>
              <p className="text-sm text-gray-700">
                {e.company_name} — {e.number_of_people_required || "N/A"}
              </p>
              <p className="text-xs text-gray-500">
                {e.from} – {e.salary || "Present"}
              </p>
              <p className="text-xs text-gray-500">
                📍 {e.location || "Location not specified"}
              </p>
              {e.JobDescription && (
                <p className="text-sm mt-2 text-gray-500">{e.JobDescription}</p>
              )}
            </div>
            <div className="flex gap-2 mt-1">
              <button
                onClick={() => editJob(e)}
                className="text-blue-500 hover:text-blue-700"
                title="Edit"
              >
                <Edit />
              </button>
              <button
                onClick={() => removeJob(e.id)}
                className="text-red-500 hover:text-red-700"
                title="Remove"
              >
                <Trash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {!addJob && (
        <div
          className="p-6 ring-2 hover:ring-lime-500 text-center bg-gray-50 rounded-lg cursor-pointer hover:shadow-md transition-all duration-300 text-zinc- hover:text-lime-500"
          onClick={() => setAddJob(!addJob)}
        >
          <Plus className="w-6 h-6 inline-block" />
        </div>
      )}

      {/* FORM */}
      {addJob && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-10 p-6 rounded-lg bg-gray-50">
            <InputField
              label="Fill your JOB Post details"
              placeholder="JobTittle "
              value={form.JobTittle}
              setValue={(value) =>
                setForm({ ...form, JobTittle: value.toString() })
              }
            />

            <InputField
              className="input mt-5"
              placeholder="company_name"
              value={form.company_name}
              setValue={(value) =>
                setForm({ ...form, company_name: value.toString() })
              }
            />

            <InputField
              className="input md:col-span-2"
              placeholder="Peoples Are Required"
              value={form.number_of_people_required}
              setValue={(value) =>
                setForm({
                  ...form,
                  number_of_people_required: value.toString(),
                })
              }
            />

            <InputField
              className="input"
              placeholder="Location (e.g. Lahore, Remote)"
              value={form.location}
              setValue={(value) =>
                setForm({ ...form, location: value.toString() })
              }
            />

            <InputField
              className="input"
              placeholder="Salary"
              value={form.salary}
              setValue={(value) =>
                setForm({ ...form, salary: value.toString() })
              }
            />

            <TextAreaField
              className="input md:col-span-2"
              placeholder="JobDescription"
              rows={4}
              value={form.JobDescription}
              setValue={(value) =>
                setForm({ ...form, JobDescription: value.toString() })
              }
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={addJobHandler}
              className="flex items-center gap-2 bg-zinc-700 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-zinc-900 transition-all"
            >
              <Plus />
              {editingId ? "Update Job" : "Add Job"}
            </button>
            <button
              onClick={() => setAddJob(false)}
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
