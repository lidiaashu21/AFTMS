"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import a1 from "../../public/image/a1.jpg";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-8 sm:py-10">
        <div className="absolute inset-0 bg-gradient-to-r from-red-950 via-red-900 to-black" />

        <div className="absolute left-5 top-5 h-10 w-10 rounded-full bg-red-700/20 blur-2xl" />
        <div className="absolute bottom-5 right-5 h-12 w-12 rounded-full bg-red-600/20 blur-2xl" />

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold sm:text-2xl md:text-3xl"
          >
            About AFTMS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-2 max-w-xl text-xs text-gray-300 sm:text-sm"
          >
            A modern platform for managing football tournaments, teams,
            fixtures, and match results.
          </motion.p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-10">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-xl font-bold text-slate-800 md:text-2xl">
              Our Mission
            </h2>

            <p className="mb-3 text-sm leading-relaxed text-gray-600">
              The Addis Football Tournament Management System (AFTMS) provides a
              centralized platform for football tournament administration.
            </p>

            <p className="mb-3 text-sm leading-relaxed text-gray-600">
              It allows Admins and Team Managers to collaborate efficiently
              throughout the tournament lifecycle.
            </p>

            <p className="text-sm leading-relaxed text-gray-600">
              From team registration and payment verification to fixture
              generation and match result tracking, AFTMS simplifies every step
              of tournament management.
            </p>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="
              relative
              h-[200px]
              overflow-hidden
              rounded-2xl
              shadow-xl
              sm:h-[250px]
              md:h-[300px]
              lg:h-[340px]
            "
          >
            <Image
              src={a1}
              alt="Football Tournament"
              fill
              priority
              className="object-cover transition duration-500 hover:scale-105"
            />
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            className="mb-6 text-center text-xl font-bold text-slate-800 md:text-2xl"
          >
            What AFTMS Provides
          </motion.h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="Tournament Management"
              description="Create, organize and manage tournaments efficiently."
            />

            <FeatureCard
              title="Team Registration"
              description="Register teams and manage documents and payments."
            />

            <FeatureCard
              title="Fixtures & Results"
              description="Generate fixtures and track match results easily."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-md
      "
    >
      <h3 className="mb-2 text-base font-semibold text-red-700">{title}</h3>

      <p className="text-sm text-gray-600">{description}</p>
    </motion.div>
  );
}
