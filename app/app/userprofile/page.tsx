"use client";

import EducationSection from "@/components/app/userProfile/Education";
import ExperienceSection from "@/components/app/userProfile/Experience";
import IntroductionSection from "@/components/app/userProfile/Introduction";
import SkillsSection from "@/components/app/userProfile/Skills";

export default function UserProfile() {
  return (
    <>
      <IntroductionSection />
      <div className="my-10"></div>
      <EducationSection />
      <div className="my-10"></div>
      <ExperienceSection />
      <div className="my-10"></div>
      <SkillsSection />
    </>
  );
}
