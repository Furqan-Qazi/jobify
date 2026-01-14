import InputField from "@/components/global/InputField";
import { Cross, Plus, X } from "lucide-react";
import { useState } from "react";

export default function SkillsSection() {
  const [addSkill, setAddSkill] = useState<boolean>(false);
  const [list, setList] = useState<string[]>([]);
  const [form, setForm] = useState<string>("");

  const addSkillHandler = () => {
    if (!form) return;
    if (list.includes(form)) return;

    setList((prev) => [...prev, form]);

    setForm("");
    setAddSkill(false);
  };

  return (
    <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-8">
      <div className="flex items-center justify-between border-b pb-2">
        <h2 className="text-3xl text-gray-700 font-bold">Skills</h2>

        <button
          onClick={addSkillHandler}
          className="flex items-center gap-2 bg-zinc-700 text-white px-4 py-2 rounded-lg hover:bg-zinc-900"
        >
          <Plus className="w-4 h-4" />
          Save
        </button>
      </div>
      {/* LIST */}
      <div className="my-4 flex items-center gap-2">
        {list.map((e) => (
          <div
            key={e}
            className="flex items-center gap-1 text-lime-700 bg-lime-100 px-4 py-2 rounded-full"
          >
            {e}
            <span
              className="cursor-pointer text-lime-500 hover:text-red-700"
              onClick={() => setList((prev) => prev.filter((el) => el !== e))}
            >
              <X className="h-4 w-4" />
            </span>
          </div>
        ))}
      </div>

      {/* FORM */}
      <div className="flex gap-4 bg-gray-10 p-6 items-end rounded-lg bg-gray-50">
        <InputField
          label="Add Skill"
          placeholder="Type you skill"
          value={form}
          setValue={(value) => setForm(value)}
        />

        <button
          onClick={addSkillHandler}
          className="flex items-center gap-2 bg-zinc-700 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-zinc-900 transition-all"
        >
          <Plus />
          {addSkill ? "Update" : "Add"}
        </button>
      </div>
    </section>
  );
}
