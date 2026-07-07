"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, ArrowLeft } from "lucide-react";

import b1 from "../../public/image/b1.jpg";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Example API call
      // await api.post("/auth/forgot-password", { email });

      setSuccess(
        "If an account exists with this email, a password reset link has been sent.",
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-6">
      {/* Background Image */}
      <Image
        src={b1}
        alt="Football Background"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Glow Effects */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute left-0 top-20 h-40 w-40 rounded-full bg-red-600/30 blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="absolute bottom-10 right-0 h-56 w-56 rounded-full bg-red-500/30 blur-3xl"
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-sm rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl shadow-[0_8px_32px_rgba(255,255,255,0.15)]"
      >
        {/* Shine Effect */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent" />

        {/* Back Button */}
        <Link
          href="/login"
          className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
        >
          <ArrowLeft size={16} />
        </Link>

        {/* Header */}
        <div className="mt-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20">
            <Mail className="h-6 w-6 text-red-300" />
          </div>

          <h1 className="text-xl font-bold text-white">Forgot Password</h1>

          <p className="mt-2 text-xs text-gray-300">
            Enter your email address and we'll send you a password reset link.
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mt-4 rounded-xl border border-green-500/30 bg-green-500/20 p-3 text-sm text-green-200">
            {success}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="mt-5 space-y-4"
        >
          <div className="flex items-center rounded-xl border border-white/20 bg-white/10 px-3 backdrop-blur-md focus-within:border-red-500">
            <Mail size={16} className="text-gray-300" />

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-gray-400 outline-none"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-red-700 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </motion.button>
        </form>

        {/* Footer */}
        <div className="mt-4 text-center">
          <Link
            href="/login"
            className="text-sm font-medium text-red-300 transition hover:text-red-200"
          >
            Back to Login
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
