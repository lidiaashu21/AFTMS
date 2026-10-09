"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Target, Eye, type LucideIcon } from "lucide-react";

import a1 from "../../public/image/a1.jpg";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* ================= HERO ================= */}
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

      {/* ================= ABOUT ================= */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-3xl font-bold text-slate-800">
              Who We Are
            </h2>

            <p className="mb-5 leading-8 text-gray-600">
              The Addis Football Tournament Management System (AFTMS) was
              designed to replace traditional paper-based tournament management
              with a secure, efficient, and fully digital solution. Organizing
              football competitions involves numerous activities such as team
              registration, payment verification, player management, fixture
              generation, scheduling matches, recording results, updating league
              standings, and communicating with participants. Managing all of
              these processes manually is time-consuming and often leads to
              delays, errors, and poor coordination.
            </p>

            <p className="mb-5 leading-8 text-gray-600">
              AFTMS addresses these challenges by providing one centralized
              platform where administrators can oversee the entire tournament,
              while team managers can register teams, upload payment receipts,
              manage player information, and monitor tournament progress in
              real-time.
            </p>

            <p className="leading-8 text-gray-600">
              The platform promotes transparency, fairness, efficiency, and
              accuracy by ensuring that tournament information is organized,
              secure, and accessible to authorized users whenever needed.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="relative h-[320px] overflow-hidden rounded-3xl shadow-2xl md:h-[500px]"
          >
            <Image
              src={a1}
              alt="Football Tournament"
              fill
              priority
              className="object-cover transition duration-700 hover:scale-105"
            />
          </motion.div>
        </div>
      </section>

      {/* ================= MISSION / VISION ================= */}
      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-2">
          <InfoCard
            icon={Target}
            title="Our Mission"
            description="Our mission is to provide a reliable, secure, and user-friendly football tournament management platform that simplifies administrative work and enhances collaboration among tournament organizers, administrators, and team managers. We aim to reduce manual processes by automating registration, payment verification, fixture scheduling, match result recording, and tournament monitoring. Through digital innovation, AFTMS strives to improve operational efficiency, minimize human error, save time, and create a better tournament experience for everyone involved."
          />

          <InfoCard
            icon={Eye}
            title="Our Vision"
            description="Our vision is to become the leading football tournament management platform in Ethiopia and eventually across Africa by providing innovative digital solutions for sports competitions. We aspire to modernize tournament administration through technology, enabling organizers to manage competitions more professionally, transparently, and efficiently while encouraging greater participation, fairness, and growth in grassroots football."
          />
        </div>
      </section>

      {/* ================= GOALS ================= */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-10 text-center text-3xl font-bold text-slate-800"
          >
            Our Goals
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="Digital Tournament Management"
              description="Provide a complete digital environment that allows administrators to efficiently organize football tournaments from registration to championship completion."
            />

            <FeatureCard
              title="Improve Efficiency"
              description="Reduce paperwork, eliminate repetitive manual tasks, minimize administrative workload, and significantly improve productivity."
            />

            <FeatureCard
              title="Increase Transparency"
              description="Ensure that registrations, payments, fixtures, standings, and match results are managed fairly and transparently for all participants."
            />

            <FeatureCard
              title="Better Team Experience"
              description="Allow team managers to register teams, upload documents, verify payments, manage players, and monitor tournament progress from one platform."
            />

            <FeatureCard
              title="Accurate Data Management"
              description="Maintain organized and secure tournament information while reducing human errors through automated workflows."
            />

            <FeatureCard
              title="Support Future Growth"
              description="Build a scalable platform capable of supporting larger tournaments, additional sports, analytics, mobile access, and future technological improvements."
            />
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-12 text-center text-3xl font-bold text-slate-800"
          >
            What AFTMS Provides
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="Tournament Management"
              description="Create, configure, organize, and monitor football tournaments with complete administrative control."
            />

            <FeatureCard
              title="Team Registration"
              description="Allow teams to register online while securely storing player information, documents, and payment records."
            />

            <FeatureCard
              title="Payment Verification"
              description="Enable administrators to review payment receipts, approve registrations, and maintain accurate financial records."
            />

            <FeatureCard
              title="Fixture Generation"
              description="Automatically create tournament fixtures, schedules, and match pairings for efficient competition management."
            />

            <FeatureCard
              title="Match Results"
              description="Record match scores, update standings instantly, and provide real-time tournament progress."
            />

            <FeatureCard
              title="Dashboard & Reports"
              description="Provide administrators with statistics, tournament summaries, reports, and performance insights for informed decision-making."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-lg sm:p-8"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-700/10 sm:mb-5 sm:h-14 sm:w-14">
        <Icon className="h-6 w-6 text-red-700 sm:h-7 sm:w-7" />
      </div>

      <h3 className="mb-4 text-xl font-bold text-red-700 sm:mb-5 sm:text-2xl">
        {title}
      </h3>

      <p className="leading-7 text-gray-600 sm:leading-8">{description}</p>
    </motion.div>
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
      whileHover={{ y: -6 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg transition"
    >
      <h3 className="mb-4 text-xl font-semibold text-red-700">{title}</h3>

      <p className="leading-7 text-gray-600">{description}</p>
    </motion.div>
  );
}
