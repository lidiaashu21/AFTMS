"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowLeft, LogIn, Eye, EyeOff } from "lucide-react";

import api from "../../service/api";
import { persistSession, dashboardPathForRole } from "../../lib/session";
import b1 from "../../public/image/b1.jpg";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

    // prevent double click
    if (loading) return;

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

      // Persists to cookies (read by the proxy/middleware) and localStorage,
      // with a long expiry so the user stays signed in until they log out.
      persistSession(token, user);

      // clear the inputs so credentials don't linger after login
      setForm({ email: "", password: "" });
      setShowPassword(false);

      const path = dashboardPathForRole(user.role);

      // small delay to make sure cookie is saved
      setTimeout(() => {
        if (path) {
          router.replace(path);
        } else {
          setError("Unknown role: " + user.role);
        }
      }, 100);
    } catch (err: any) {
      console.error("LOGIN ERROR:", err);

      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-6">
      <Image
        src={b1}
        alt="Football Background"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/20" />

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="relative z-10 w-full max-w-[380px] rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl"
      >
        <Link
          href="/"
          className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white"
        >
          <ArrowLeft size={16} />
        </Link>

        <div className="mt-6 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20">
            <LogIn className="h-5 w-5 text-red-300" />
          </div>

          <h1 className="mt-3 text-xl font-bold text-white">Welcome Back</h1>

          <p className="mt-1 text-xs text-gray-300">Login to your account</p>
        </div>

        {error && (
          <div className="mt-4 rounded-lg bg-red-500/20 p-3 text-xs text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="flex items-center rounded-lg border border-white/20 bg-white/10 px-3">
            <Mail size={16} className="text-gray-300" />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none"
            />
          </div>

          <div className="flex items-center rounded-lg border border-white/20 bg-white/10 px-3">
            <Lock size={16} className="shrink-0 text-gray-300" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full min-w-0 bg-transparent px-3 py-3 text-sm text-white outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="shrink-0 rounded-md p-1 text-gray-300 transition hover:text-white"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-red-300 hover:text-red-200"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-red-700 py-3 text-sm font-semibold text-white hover:bg-red-800 disabled:opacity-60"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-gray-300">
          Donot have an account?{" "}
          <Link href="/register" className="font-medium text-red-300">
            Register
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
