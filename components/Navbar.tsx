import React from "react";
import Link from "next/link";
import { BellDot } from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-7 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-6xl px-6 py-3 bg-black/60 text-white rounded-full border border-white/30 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <BellDot size={28} className="text-lime-400" />
        <h1 className="text-2xl font-bold text-lime-300">
          Right <span className="text-lime-200">Recruits</span>
        </h1>
      </div>

      {/* Links */}
      <ul className="hidden md:flex gap-6 items-center text-sm font-medium">
        <li className="hover:text-lime-200 transition">Home</li>
        <li className="hover:text-lime-200 transition">Service</li>
        <li className="hover:text-lime-200 transition">About Us</li>
        <li className="hover:text-lime-200 transition">Jobs</li>
        <li className="hover:text-lime-200 transition">Contact Us</li>
      </ul>

      {/* Auth Buttons */}
      <div className="flex items-center gap-3 ml-4">
        <Link
          href="/login"
          className="px-4 py-2 rounded-full border border-lime-400 text-lime-300 hover:bg-lime-400 hover:text-black transition"
        >
          Login
        </Link>

        <Link
          href="/signup"
          className="px-5 py-2 rounded-full bg-lime-500 text-black font-semibold hover:bg-lime-400 transition"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
