"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  BellDot,
  User,
} from "lucide-react";

// Optional button component
const CustomButton = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => (
  <button
    type="submit"
    className={`bg-lime-500 text-black font-semibold w-full py-3 rounded-xl hover:bg-lime-600 transition ${className}`}
  >
    {text}
  </button>
);

// Navbar Component (reuse same)
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
      <div className="flex items-center gap-3 ml-4 ">
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

// Signup Page
export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validate = () => {
    const nextErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!name) nextErrors.name = "Enter your full name";

    if (!email || !/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(email)) {
      nextErrors.email = "Enter a valid email address";
    }

    if (!password || password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
    }

    if (confirmPassword !== password) {
      nextErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // TODO: Connect Supabase signup here
    console.log("Signup valid:", { name, email, password });
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-lime-500 to-lime-900 pt-32">
        {/* Main content */}
        <div className="flex-grow flex items-center justify-center px-6 pb-19">
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Info Panel */}
            <div className="hidden lg:flex flex-col justify-between rounded-3xl overflow-hidden bg-black/10 border border-white/20">
              <div className="p-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-900 flex items-center justify-center">
                    <User className="text-white" size={18} />
                  </div>
                  <h1 className="text-2xl font-bold text-white">
                    Right <span className="text-lime-200">Recruits</span>
                  </h1>
                </div>
                <p className="mt-4 text-white/90">
                  Join Right Recruits today. Track applications, manage jobs,
                  and connect faster.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-sm text-white/90">Trusted Employers</p>
                    <p className="text-xl font-bold text-white">10K+</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-sm text-white/90">Active Jobs</p>
                    <p className="text-xl font-bold text-white">2,500+</p>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-black/20">
                <div className="flex items-center justify-between">
                  <p className="text-white/80">Already have an account?</p>
                  <Link
                    href="/login"
                    className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-lime-200 transition"
                  >
                    Sign In
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Form Panel */}
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  Create an account
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  Start your journey with Right Recruits
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-6" noValidate>
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <div className="mt-2 relative">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full px-4 py-3 pl-11 text-gray-800 rounded-xl border outline-none transition focus:ring-2 focus:ring-lime-500 ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="John Doe"
                    />
                    <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-2 relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-4 py-3 pl-11 text-gray-800 rounded-xl border outline-none transition focus:ring-2 focus:ring-lime-500 ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="you@example.com"
                    />
                    <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-2 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full px-4 py-3 pl-11 pr-11 text-gray-800 rounded-xl border outline-none transition focus:ring-2 focus:ring-lime-500 ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter password"
                    />
                    <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-2 relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full px-4 py-3 pl-11 pr-11 text-gray-800 rounded-xl border outline-none transition focus:ring-2 focus:ring-lime-500 ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Re-enter password"
                    />
                    <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <button
                      type="button"
                      aria-label={
                        showConfirm ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowConfirm((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showConfirm ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <CustomButton text="Sign Up" />

                {/* Social signup */}
                <div className="flex items-center gap-3">
                  <div className="h-px bg-gray-200 flex-1" />
                  <span className="text-xs text-gray-500">
                    or continue with
                  </span>
                  <div className="h-px bg-gray-200 flex-1" />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <button className="w-full border border-gray-300 rounded-xl py-2 text-sm hover:bg-gray-50 transition">
                    Google
                  </button>
                  <button className="w-full border border-gray-300 rounded-xl py-2 text-sm hover:bg-gray-50 transition">
                    GitHub
                  </button>
                  <button className="w-full border border-gray-300 rounded-xl py-2 text-sm hover:bg-gray-50 transition">
                    LinkedIn
                  </button>
                </div>

                {/* Login link */}
                <p className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-lime-700 hover:text-lime-900"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
