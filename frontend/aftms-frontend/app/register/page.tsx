"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { User, Mail, Phone, Lock, UserPlus, ArrowLeft } from "lucide-react";

import api from "../../service/api";
import { persistSession } from "../../lib/session";
import b1 from "../../public/image/b1.jpg";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Clear form whenever the page loads or refreshes
  useEffect(() => {
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
    });

    setError("");
    setSuccess("");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      setLoading(true);

      // Force role to TEAM_MANAGER
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "TEAM_MANAGER",
      };

      await api.post("/auth/register", payload);

      setSuccess("Account created successfully. Redirecting to your dashboard...");

      // Log the new manager straight in so they land on the dashboard
      // instead of having to submit the login form a second time.
      const loginRes = await api.post("/auth/login", {
        email: payload.email,
        password: payload.password,
      });

      const loginData = loginRes.data?.data || loginRes.data;
      const token = loginData?.token;
      const user = loginData?.user;

      if (!token || !user) {
        throw new Error("Invalid server response");
      }

      persistSession(token, user);

      router.replace("/team-manager/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Registration failed.");
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-6">
      {/* Background */}
      <Image
        src={b1}
        alt="Football Background"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-[380px] rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl"
      >
        {/* Back Button */}
        <Link
          href="/"
          className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        >
          <ArrowLeft size={16} />
        </Link>

        {/* Header */}
        <div className="mt-6 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20">
            <UserPlus className="h-5 w-5 text-red-300" />
          </div>

          <h1 className="mt-3 text-xl font-bold text-white">
            Create Team Manager Account
          </h1>

          <p className="mt-1 text-xs text-gray-300">
            Register as a Team Manager only
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-lg bg-red-500/20 p-3 text-xs text-red-200">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="mt-4 rounded-lg bg-green-500/20 p-3 text-xs text-green-200">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Name */}
          <div className="flex items-center rounded-lg border border-white/20 bg-white/10 px-3">
            <User size={16} className="text-gray-300" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="off"
              className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-gray-400"
            />
          </div>

          {/* Email */}
          <div className="flex items-center rounded-lg border border-white/20 bg-white/10 px-3">
            <Mail size={16} className="text-gray-300" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="off"
              className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-gray-400"
            />
          </div>

          {/* Phone */}
          <div className="flex items-center rounded-lg border border-white/20 bg-white/10 px-3">
            <Phone size={16} className="text-gray-300" />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number (Optional)"
              value={formData.phoneNumber}
              onChange={handleChange}
              autoComplete="off"
              className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-gray-400"
            />
          </div>

          {/* Password */}
          <div className="flex items-center rounded-lg border border-white/20 bg-white/10 px-3">
            <Lock size={16} className="text-gray-300" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
              className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-gray-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-red-700 py-3 text-sm font-semibold text-white transition hover:bg-red-800 disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Register as Team Manager"}
          </button>
        </form>

        {/* Login */}
        <div className="mt-5 text-center text-xs text-gray-300">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-red-300 hover:text-red-200"
          >
            Login
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
