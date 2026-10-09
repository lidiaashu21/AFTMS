"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((item) => item.startsWith("token="))
      ?.split("=")[1];

    const user = localStorage.getItem("user");

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);

        if (parsedUser.role === "ADMIN") {
          router.replace("/admin/dashboard");
          return;
        }

        if (parsedUser.role === "TEAM_MANAGER") {
          router.replace("/team-manager/dashboard");
          return;
        }
      } catch (error) {
        console.error("Invalid user data:", error);
      }
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    return null;
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <Image
        src="/image/hero.png"
        alt="Football Stadium"
        fill
        priority
        className="object-cover"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60" />

      {/* CONTENT */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-5">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white max-w-4xl"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold"
          >
            Ready for Glory? Join Now
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-10 grid grid-cols-2 gap-4 max-w-sm mx-auto"
          >
            <Link
              href="/login"
              className="px-6 py-3 bg-red-700 text-white rounded-xl font-semibold hover:bg-red-600 transition"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="px-6 py-3 bg-white text-black rounded-xl font-semibold hover:scale-105 transition"
            >
              Register
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
