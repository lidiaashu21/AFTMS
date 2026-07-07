"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Target } from "lucide-react";
import Image, { StaticImageData } from "next/image";

// images
import t1 from "../public/image/t1.png";
import t2 from "../public/image/t2.png";
import t3 from "../public/image/t3.png";
import t4 from "../public/image/t4.png";
import t5 from "../public/image/t5.png";
import t6 from "../public/image/t6.png";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* ================= HERO ================= */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* ✅ BACKGROUND VIDEO (FIXED) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          {/* ❗ MUST be in /public/video/V.mp4 */}
          <source src="/video/V1.mp4" type="video/mp4" />
        </video>

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
              className="text-white text-3xl sm:text-5xl font-bold"
            >
              Addis Football Tournament
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-gray-200 text-sm sm:text-lg"
            >
              Manage football tournaments in one powerful platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex gap-4 justify-center"
            >
              <Link
                href="/login"
                className="px-6 py-3 bg-red-700 text-white rounded-xl hover:bg-red-600"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-6 py-3 bg-white text-black rounded-xl hover:scale-105 transition"
              >
                Register
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

/* ================= FEATURE ITEM ================= */
function FeatureItem({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-2.5 h-2.5 bg-red-600 rounded-full" />
      <p className="font-medium">{title}</p>
    </div>
  );
}
