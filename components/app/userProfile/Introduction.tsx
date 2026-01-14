"use client";

import { Edit, Plus, Trash } from "lucide-react";
import InputField from "../../../components/global/InputField";
import TextAreaField from "../../../components/global/TextAreaField";
import CountryStateCity from "./CountryStateCity";
import { useState } from "react";

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
  cvFileName?: string; // CV file name
};

export default function IntroductionSection() {
  const [addIntroduction, setAddIntroduction] = useState<boolean>(false);
  const [list, setList] = useState<Introduction[]>([]);
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null); // CV state

  const addIntroductionHandler = () => {
    if (!form.name || !form.email || !form.phone_number) return;

    const newItem: Introduction = {
      ...form,
      id: editingId || Date.now().toString(),
      cvFileName: cvFile ? cvFile.name : form.cvFileName || "",
    };

    if (editingId) {
      // Edit
      setList((prev) => prev.map((e) => (e.id === editingId ? newItem : e)));
      setEditingId(null);
    } else {
      // Add
      setList((prev) => [...prev, newItem]);
    }

    // Reset
    setForm({
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
    setCvFile(null);
    setAddIntroduction(false);
  };

  const removeIntroduction = (id: string) => {
    setList((prev) => prev.filter((e) => e.id !== id));
  };

  const editIntroduction = (item: Introduction) => {
    setForm(item);
    setCvFile(null); // CV reset
    setEditingId(item.id);
    setAddIntroduction(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

      {/* LIST */}
      <div className="space-y-4">
        {list.map((e) => (
          <div
            key={e.id}
            className="flex justify-between items-start p-4 border rounded-lg hover:shadow-lg transition-shadow duration-300"
          >
            <div className="space-y-1">
              <h3 className="font-semibold text-gray-700 text-lg">{e.name}</h3>
              <p className="text-sm text-gray-700">
                {e.email} — {e.line || "N/A"}
              </p>
              <p className="text-xs text-gray-500">
                {e.phone_number} – {e.to || "Present"}
              </p>
              <p className="text-xs text-gray-500">
                {e.country || "-"} / {e.state || "-"} / {e.city || "-"}
              </p>
              {e.about_yourself && (
                <p className="text-sm mt-2 text-gray-500">{e.about_yourself}</p>
              )}
              {e.cvFileName && (
                <p className="text-sm text-green-600 mt-1">
                  CV: {e.cvFileName}
                </p>
              )}
            </div>

            <div className="flex gap-2 mt-1">
              <button
                onClick={() => editIntroduction(e)}
                className="text-blue-500 hover:text-blue-700"
              >
                <Edit />
              </button>
              <button
                onClick={() => removeIntroduction(e.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 rounded-lg bg-gray-50">
        <InputField
          placeholder="Name"
          value={form.name}
          setValue={(v) => setForm({ ...form, name: v })}
        />
        <InputField
          placeholder="Email"
          value={form.email}
          setValue={(v) => setForm({ ...form, email: v })}
          disabled
        />
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

        {/* CV Upload */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-500 mb-2">
            Upload Your CV
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                setCvFile(file);
                setForm({ ...form, cvFileName: file.name });
              }
            }}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-lime-500"
          />
          {cvFile && (
            <p className="text-sm text-green-600 mt-1">
              Selected: {cvFile.name}
            </p>
          )}
        </div>

        <TextAreaField
          className="md:col-span-2"
          placeholder="Address"
          rows={4}
          value={form.address}
          setValue={(v) => setForm({ ...form, address: v })}
        />

        <InputField
          className="md:col-span-2"
          placeholder="Line"
          value={form.line}
          setValue={(v) => setForm({ ...form, line: v.toString() })}
        />

        <TextAreaField
          className="md:col-span-2"
          placeholder="About Yourself"
          rows={4}
          value={form.about_yourself}
          setValue={(v) => setForm({ ...form, about_yourself: v.toString() })}
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={addIntroductionHandler}
          className="flex items-center gap-2 bg-zinc-700 text-white px-6 py-3 rounded-lg hover:bg-zinc-900"
        >
          <Plus />
          {editingId ? "Update Introduction" : "Add Introduction"}
        </button>
        <button
          onClick={() => setAddIntroduction(false)}
          className="flex items-center gap-2 bg-zinc-300 text-zinc-700 px-6 py-3 rounded-lg hover:bg-zinc-100"
        >
          Cancel
        </button>
      </div>
    </section>
  );
}
