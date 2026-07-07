"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowLeft, LogIn } from "lucide-react";

import api from "../../service/api";
import b1 from "../../public/image/b1.jpg";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Clear fields whenever page loads/refreshed
  useEffect(() => {
    setForm({
      email: "",
      password: "",
    });

    setError("");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await api.post("/auth/login", form);

      console.log("FULL RESPONSE:", res.data);

      const responseData = res.data?.data || res.data;

      const token = responseData?.token;
      const user = responseData?.user;

      if (!token || !user) {
        throw new Error("Invalid server response");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      document.cookie = `token=${token}; path=/; max-age=86400`;
      document.cookie = `role=${user.role}; path=/; max-age=86400`;

      if (user.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else if (user.role === "TEAM_MANAGER") {
        router.push("/team-manager/dashboard");
      } else {
        setError("Unknown role: " + user.role);
      }
    } catch (err: any) {
      console.error("LOGIN ERROR:", err);
      setError(err.message || "Login failed");
    } finally {
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
        {/* Back */}
        <Link
          href="/"
          className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        >
          <ArrowLeft size={16} />
        </Link>

        {/* Header */}
        <div className="mt-6 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20">
            <LogIn className="h-5 w-5 text-red-300" />
          </div>

          <h1 className="mt-3 text-xl font-bold text-white">Welcome Back</h1>

          <p className="mt-1 text-xs text-gray-300">Login to your account</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-lg bg-red-500/20 p-3 text-xs text-red-200">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Email */}
          <div className="flex items-center rounded-lg border border-white/20 bg-white/10 px-3">
            <Mail size={16} className="text-gray-300" />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
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
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
              className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-gray-400"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-red-700 py-3 text-sm font-semibold text-white transition hover:bg-red-800 disabled:opacity-60"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        {/* Register */}
        <div className="mt-5 text-center text-xs text-gray-300">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-red-300 hover:text-red-200"
          >
            Register
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
