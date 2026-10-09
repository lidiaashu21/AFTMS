"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Target, CheckCircle2 } from "lucide-react";
import Image, { StaticImageData } from "next/image";

// images
import t1 from "../public/image/t1.png";
import t2 from "../public/image/t2.png";
import t3 from "../public/image/t3.png";
import t4 from "../public/image/t4.png";
import t5 from "../public/image/t5.png";
import t6 from "../public/image/t6.png";
import c1 from "../public/image/c1.png";
import fixture from "../public/image/fixture.png";
import livematch from "../public/image/livematch.png";
import playertool from "../public/image/playertool.png";
import heroPoster from "../public/image/hero.png";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* ================= HERO ================= */}
      <section className="relative h-[85vh] sm:h-[90vh] lg:h-screen w-full overflow-hidden">
        <HeroBackground />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/50" />

        {/* CONTENT */}
        <div className="relative z-10 flex items-center justify-center h-full px-4 text-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="text-white text-3xl sm:text-5xl font-bold "
            >
              Addis Football Tournament
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
              className=" mt-6  text-gray-200 text-xl sm:text-3xl"
            >
              One Platform. Every Tournament.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3 }}
              className="mt-10 flex justify-center"
            >
              <Link
                href="/welcome"
                className="px-16 py-4 bg-gradient-to-r from-red-950 via-red-900 to-black text-white transition text-lg rounded-xl font-semibold"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="bg-slate-50 py-16 text-black">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold"
          >
            Platform Features
          </motion.h2>

          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Feature image={t1} title="Tournament Management" />
            <Feature image={t2} title="Team Management" />
            <Feature image={t3} title="Fixtures" />
            <Feature image={t4} title="Announcements" />
          </div>
        </div>
      </section>

      {/* ================= WHAT YOU GET ================= */}
      <section className="bg-white py-16 px-4 text-black sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold sm:text-3xl"
            >
              What You Get From The Platform
            </motion.h2>

            <p className="mt-3 text-sm text-gray-600 sm:text-base">
              Everything needed to run a tournament end-to-end, in one place.
            </p>
          </div>

          <div className="mt-14 flex flex-col gap-16 sm:gap-20 lg:gap-24">
            <BenefitRow
              image={c1}
              title="Complete Oversight"
              description="Administrators manage every tournament from a single dashboard, from initial setup all the way through to the championship match. Every registration, fixture, and result stays organized in one place."
              points={[
                "Create and configure tournaments in minutes",
                "Monitor progress across every stage",
                "One dashboard for every competition",
              ]}
            />

            <BenefitRow
              image={fixture}
              title="Ready-Made Fixtures"
              description="Fixtures and match schedules are generated automatically, removing hours of manual planning and reducing scheduling conflicts before they happen."
              points={[
                "Automatic fixture and schedule generation",
                "Conflict-free match pairings",
                "Instant updates when schedules change",
              ]}
              reverse
            />

            <BenefitRow
              image={livematch}
              title="Live Match Action"
              description="Scores, standings, and results update in real time as matches are played, so administrators, team managers, and fans always see the latest state of the tournament."
              points={[
                "Real-time score and standings updates",
                "Match results recorded instantly",
                "Always up-to-date tournament progress",
              ]}
            />

            <BenefitRow
              image={playertool}
              title="Team & Player Tools"
              description="Team managers register squads, manage player details, upload documents, and track payment status without leaving the platform."
              points={[
                "Simple team and player registration",
                "Centralized player and document records",
                "Full visibility into payment status",
              ]}
              reverse
            />
          </div>
        </div>
      </section>

      {/* ================= UNIQUE SECTION ================= */}
      <section className="bg-white text-black py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="h-[320px] flex justify-center items-center"
          >
            <div className="relative w-full max-w-md h-full">
              <Image src={t6} alt="unique" fill className="object-contain" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center text-center lg:text-left"
          >
            <h2 className="text-3xl font-bold">
              What Makes Addis Tournament Unique?
            </h2>

            <div className="mt-6 space-y-4">
              <FeatureItem title="Real-time Match Updates" />
              <FeatureItem title="Automated Fixture Generation" />
              <FeatureItem title="Team & Player Management" />
              <FeatureItem title="Live Notifications" />
              <FeatureItem title="Secure Payment Tracking" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative py-20 overflow-hidden">
        <Image src={t5} alt="CTA Background" fill className="object-cover" />

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <Target size={50} className="mx-auto text-red-500" />

          <h2 className="mt-4 text-3xl font-bold">Ready to Get Started?</h2>

          <p className="mt-3 text-gray-200">
            Start managing football tournaments professionally.
          </p>

          <Link
            href="/tournaments"
            className="inline-block mt-6 px-8 py-3 bg-red-700 rounded-xl hover:bg-red-600"
          >
            Explore Tournaments
          </Link>
        </div>
      </section>
    </main>
  );
}

/* ================= HERO BACKGROUND ================= */
function HeroBackground() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const requestIdle =
      typeof window !== "undefined" && "requestIdleCallback" in window
        ? window.requestIdleCallback
        : (cb: IdleRequestCallback) =>
            setTimeout(() => cb({} as IdleDeadline), 300);

    const cancelIdle =
      typeof window !== "undefined" && "cancelIdleCallback" in window
        ? window.cancelIdleCallback
        : clearTimeout;

    const id = requestIdle(() => setShowVideo(true), { timeout: 2000 });

    return () => cancelIdle(id as number);
  }, []);

  return (
    <>
      <Image
        src={heroPoster}
        alt="Football stadium"
        fill
        priority
        className="object-cover"
      />

      {showVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video/V1.mp4" type="video/mp4" />
        </video>
      )}
    </>
  );
}

/* ================= FEATURE ================= */
function Feature({ image, title }: { image: StaticImageData; title: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 bg-white shadow rounded-xl text-center"
    >
      <div className="relative w-14 h-14 mx-auto">
        <Image src={image} alt={title} fill className="object-contain" />
      </div>
      <h3 className="mt-4 font-semibold">{title}</h3>
    </motion.div>
  );
}

/* ================= BENEFIT ROW ================= */
function BenefitRow({
  image,
  title,
  description,
  points,
  reverse = false,
}: {
  image: StaticImageData;
  title: string;
  description: string;
  points: string[];
  reverse?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center gap-8 lg:gap-14 ${
        reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, x: reverse ? 60 : -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative h-56 w-full overflow-hidden rounded-2xl shadow-xl sm:h-72 lg:h-80 lg:w-1/2"
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: reverse ? -60 : 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full text-center lg:w-1/2 lg:text-left"
      >
        <h3 className="text-xl font-bold sm:text-2xl">{title}</h3>

        <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
          {description}
        </p>

        <ul className="mt-5 space-y-3 text-left">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-red-700" />
              <span className="text-sm text-gray-700 sm:text-base">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

/* ================= FEATURE ITEM ================= */
function FeatureItem({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-2.5 h-2.5 bg-red-600 rounded-full" />
      <p className="font-medium">{title}</p>
    </div>
  );
}
