"use client";

import { useState, useEffect } from "react";
import InputField from "../../../components/global/InputField";
import TextAreaField from "../../../components/global/TextAreaField";
import CustomButton from "../../../components/global/Button";
import { Plus, Pencil, Trash2, Save } from "lucide-react";

type Education = {
  id: string;
  school: string;
  degree: string;
  field: string;
  from: string;
  to: string;
  description: string;
};
type Experience = {
  id: string;
  company: string;
  jobTitle: string;
  from: string;
  to: string;
  description: string;
};
type Skill = { id: string; name: string };

export default function ProfileSections() {
  // === Education ===
  const [eduList, setEduList] = useState<Education[]>([]);
  const [eduForm, setEduForm] = useState<Education>({
    id: "",
    school: "",
    degree: "",
    field: "",
    from: "",
    to: "",
    description: "",
  });
  const [editingEduId, setEditingEduId] = useState<string | null>(null);

  const addOrUpdateEducation = () => {
    if (!eduForm.school || !eduForm.degree) return;

    if (editingEduId) {
      // Edit existing
      setEduList((prev) =>
        prev.map((e) =>
          e.id === editingEduId ? { ...eduForm, id: editingEduId } : e
        )
      );
    } else {
      // Add new
      setEduList((prev) => [
        ...prev,
        { ...eduForm, id: Date.now().toString() },
      ]);
    }

    // Reset form
    setEditingEduId(null);
    setEduForm({
      id: "",
      school: "",
      degree: "",
      field: "",
      from: "",
      to: "",
      description: "",
    });
  };

  const editEducation = (e: Education) => {
    setEduForm(e);
    setEditingEduId(e.id);
  };

  const removeEducation = (id: string) =>
    setEduList((prev) => prev.filter((e) => e.id !== id));
  const saveEducation = () => {
    localStorage.setItem("eduList", JSON.stringify(eduList));
    alert("Education saved!");
  };

  // === Experience ===
  const [expList, setExpList] = useState<Experience[]>([]);
  const [expForm, setExpForm] = useState<Experience>({
    id: "",
    company: "",
    jobTitle: "",
    from: "",
    to: "",
    description: "",
  });
  const [editingExpId, setEditingExpId] = useState<string | null>(null);

  const addOrUpdateExperience = () => {
    if (!expForm.company || !expForm.jobTitle) return;

    if (editingExpId) {
      setExpList((prev) =>
        prev.map((e) =>
          e.id === editingExpId ? { ...expForm, id: editingExpId } : e
        )
      );
    } else {
      setExpList((prev) => [
        ...prev,
        { ...expForm, id: Date.now().toString() },
      ]);
    }

    setEditingExpId(null);
    setExpForm({
      id: "",
      company: "",
      jobTitle: "",
      from: "",
      to: "",
      description: "",
    });
  };

  const editExperience = (e: Experience) => {
    setExpForm(e);
    setEditingExpId(e.id);
  };
  const removeExperience = (id: string) =>
    setExpList((prev) => prev.filter((e) => e.id !== id));
  const saveExperience = () => {
    localStorage.setItem("expList", JSON.stringify(expList));
    alert("Experience saved!");
  };

  // === Skills ===
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);

  const addOrUpdateSkill = () => {
    if (!skillInput.trim()) return;

    const updatedSkills = editingSkillId
      ? skills.map((s) =>
          s.id === editingSkillId ? { id: editingSkillId, name: skillInput } : s
        )
      : [...skills, { id: Date.now().toString(), name: skillInput }];

    setSkills(updatedSkills);
    setEditingSkillId(null);
    setSkillInput("");
  };

  const editSkill = (s: Skill) => {
    setSkillInput(s.name);
    setEditingSkillId(s.id);
  };
  const removeSkill = (id: string) =>
    setSkills((prev) => prev.filter((s) => s.id !== id));
  const saveSkills = () => {
    localStorage.setItem("skills", JSON.stringify(skills));
    alert("Skills saved!");
  };

  // === Load on mount ===
  useEffect(() => {
    const storedEdu = localStorage.getItem("eduList");
    const storedExp = localStorage.getItem("expList");
    const storedSkills = localStorage.getItem("skills");
    if (storedEdu) setEduList(JSON.parse(storedEdu));
    if (storedExp) setExpList(JSON.parse(storedExp));
    if (storedSkills) setSkills(JSON.parse(storedSkills));
  }, []);

  return (
    <section className="max-w-5xl mx-auto p-8 space-y-14">
      {/* Education */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">🎓 Education</h2>
        {eduList.map((e) => (
          <div key={e.id} className="flex justify-between p-2 border rounded">
            <div>
              <h3 className="font-semibold">{e.school}</h3>
              <p>
                {e.degree} — {e.field || "N/A"}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => editEducation(e)}>
                <Pencil size={16} />
              </button>
              <button onClick={() => removeEducation(e.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        <InputField
          placeholder="School"
          value={eduForm.school}
          setValue={(v) => setEduForm({ ...eduForm, school: v })}
        />
        <InputField
          placeholder="Degree"
          value={eduForm.degree}
          setValue={(v) => setEduForm({ ...eduForm, degree: v })}
        />
        <InputField
          placeholder="Field"
          value={eduForm.field}
          setValue={(v) => setEduForm({ ...eduForm, field: v })}
        />
        <TextAreaField
          placeholder="Description"
          value={eduForm.description}
          setValue={(v) => setEduForm({ ...eduForm, description: v })}
          rows={3}
        />
        <div className="flex gap-2">
          <CustomButton
            text={editingEduId ? "Update" : "Add"}
            icon={Plus}
            onClick={addOrUpdateEducation}
          />
          <CustomButton
            text="Save"
            icon={Save}
            bgColor="bg-green-600"
            onClick={saveEducation}
          />
        </div>
      </div>

      {/* Experience */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">💼 Experience</h2>
        {expList.map((e) => (
          <div key={e.id} className="flex justify-between p-2 border rounded">
            <div>
              <h3 className="font-semibold">{e.jobTitle}</h3>
              <p>{e.company}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => editExperience(e)}>
                <Pencil size={16} />
              </button>
              <button onClick={() => removeExperience(e.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        <InputField
          placeholder="Company"
          value={expForm.company}
          setValue={(v) => setExpForm({ ...expForm, company: v })}
        />
        <InputField
          placeholder="Job Title"
          value={expForm.jobTitle}
          setValue={(v) => setExpForm({ ...expForm, jobTitle: v })}
        />
        <TextAreaField
          placeholder="Responsibilities"
          value={expForm.description}
          setValue={(v) => setExpForm({ ...expForm, description: v })}
          rows={3}
        />
        <div className="flex gap-2">
          <CustomButton
            text={editingExpId ? "Update" : "Add"}
            icon={Plus}
            onClick={addOrUpdateExperience}
          />
          <CustomButton
            text="Save"
            icon={Save}
            bgColor="bg-green-600"
            onClick={saveExperience}
          />
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">🛠 Skills</h2>
        <div className="flex gap-2">
          <InputField
            placeholder="Skill"
            value={skillInput}
            setValue={setSkillInput}
          />
          <CustomButton
            text={editingSkillId ? "Update" : "Add"}
            icon={Plus}
            onClick={addOrUpdateSkill}
          />
          <CustomButton
            text="Save"
            icon={Save}
            bgColor="bg-green-600"
            onClick={saveSkills}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
            >
              <span>{s.name}</span>
              <button onClick={() => editSkill(s)}>
                <Pencil size={14} />
              </button>
              <button onClick={() => removeSkill(s.id)}>
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
