"use client";

import { Edit, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import InputField from "../../global/InputField";
import TextAreaField from "../../global/TextAreaField";

import {
  Employer,
  getCandidateEmployer,
  saveEmployer,
  deleteEmployer,
} from "@/src/lib/employer";
import { getUser } from "@/src/lib/user";

export default function EmployerSection() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [name, setName] = useState<string | null>(null);
  const [industry, setIndustry] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const loadUser = async () => {
      const { data:userData, error } = await getUser();

      if (!userData?.user) {
        setLoading(false);
        return;
      }

      setUserId(userData.user.id);
      
      const { data } = await getCandidateEmployer(userData.user.id);
      setName(data?.company_name || null);
      setIndustry(data?.industry || null);
      setSize(data?.company_size || null);
      setWebsite(data?.website || null);
      setDescription(data?.description || null);
      setLoading(false);
    };
    loadUser();
  }, []);

  const saveHandler = async () => {
    const { data, error } = await saveEmployer(
      {
        company_name: name || "",
        industry: industry || "",
        company_size: size || "",
        website: website || "",
        description: description || "",
      },
      userId
    );
    if (error) setMessage("Save failed ❌");
    else {
      setMessage("Saved successfully ✅");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <section className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8 space-y-6">
      <div className="flex justify-between border-b pb-2">
        <h2 className="text-2xl text-gray-700 font-bold">Company Info</h2>
        <button
          onClick={saveHandler}
          className="bg-zinc-700 text-white px-4 py-2 rounded"
        >
          Save 
        </button>
      </div>

      {message && <p className="text-green-600">{message}</p>}


      <div className="grid md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded">
        <InputField
          label="Company Name"
          value={name || ""}
          setValue={(v) => setName(v.toString())}
        />
        <InputField
          label="Industry"
          value={industry || ""}
          setValue={(v) => setIndustry(v.toString())}
        />
        <InputField
          label="Company Size"
          value={size || ""}
          setValue={(v) => setSize(v.toString())}
        />
        <InputField
          label="Website"
          value={website || ""}
          setValue={(v) => setWebsite(v.toString())}
        />
        <TextAreaField
          className="md:col-span-2"
          placeholder="Description"
          value={description || ""}
          setValue={(v) => setDescription(v.toString())}
        />
      </div>
    </section>
  );
}
