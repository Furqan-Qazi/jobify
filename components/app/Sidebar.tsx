"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/src/lib/supabaseClient";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  MapPin,
  FolderOpen,
  Briefcase,
  Trash2,
  CreditCard,
  MessageSquare,
  Check,
} from "lucide-react";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("login");
    }
    router.push("/login");
  };

  const menuItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "User Dashboard",
      link: "/app/dashboard",
    },
    {
      icon: <Users size={20} />,
      label: "User Profile",
      link: "/app/userprofile",
    },
    {
      icon: <Users size={20} />,
      label: "Job POST",
      link: "/app/jobpost",
    },

    { icon: <Briefcase size={20} />, label: "My Jobs", link: "/my-jobs" },
    {
      icon: <FolderOpen size={20} />,
      label: "Submit Jobs",
      link: "/submit-jobs",
    },
    {
      icon: <Briefcase size={20} />,
      label: "Application Job",
      link: "/applications",
    },
    {
      icon: <Check size={20} />,
      label: "Shortlisted Candidates",
      link: "/shortlisted",
    },
    { icon: <CreditCard size={20} />, label: "Packege", link: "/package" },
    { icon: <MessageSquare size={20} />, label: "Message", link: "/message" },
    {
      icon: <Settings size={20} />,
      label: "Change Password",
      link: "/change-password",
    },
    {
      icon: <Trash2 size={20} />,
      label: "Delete Account",
      link: "/delete-account",
    },
    { icon: <LogOut size={20} />, label: "Logout", link: "/logout" },
  ];

  return (
    <aside className="fixed left-0 w-70 h-[calc(100vh)] bg-gray-900 text-white p-6 overflow-y-auto shadow-lg">
      {/* PROFILE SECTION */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-lime-400 shadow-md">
          <img
            src="/images/men.jpg"
            alt="Admin"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mt-3 px-4 py-1 bg-lime-500 rounded-full shadow-sm">
          <span className="text-sm font-semibold text-white">
            {JSON.parse(window?.localStorage.getItem("login") ?? "{}")
              ?.full_name ?? "No Name"}
          </span>
        </div>

        <a href="#" className="mt-2 text-xs text-lime-300 hover:underline">
          Job seeker
        </a>

        <div className="flex items-center gap-1 mt-1 text-xs text-gray-300">
          <MapPin size={14} />
          Karachi, Pakistan
        </div>
      </div>

      {/* MENU */}
      <nav className="flex flex-col space-y-2">
        {menuItems.map((item, index) =>
          item.label === "Logout" ? (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                handleLogout();
              }}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer ${
                activeIndex === index
                  ? "bg-gray-800 text-green-400"
                  : "text-gray-200 hover:bg-gray-800/50 hover:text-green-400"
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ) : (
            <Link
              key={index}
              href={item.link}
              onClick={() => setActiveIndex(index)}
              className={`
              flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200
              cursor-pointer
              ${
                activeIndex === index
                  ? "bg-gray-800 text-green-400"
                  : "text-gray-200 hover:bg-gray-800/50 hover:text-green-400"
              }
            `}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          )
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
