"use client";

import { useEffect, useState } from "react";
import { Megaphone } from "lucide-react";
import { motion } from "framer-motion";
import api from "../../service/api";

interface Announcement {
  id: string;
  title: string;
  message: string;
  createdAt: string;
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);

        const res = await api.get("/announcements");

        console.log("ANNOUNCEMENTS API:", res.data);

        // ✅ FIX: always ensure ARRAY
        const data = Array.isArray(res?.data?.data)
          ? res.data.data
          : Array.isArray(res?.data)
            ? res.data
            : Array.isArray(res)
              ? res
              : [];

        setAnnouncements(data); // ✅ SAFE
      } catch (error) {
        console.error(error);
        setError("Failed to load announcements");
        setAnnouncements([]); // ✅ prevent crash
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <main className="relative min-h-screen text-white">
      {/* ================= BACKGROUND ================= */}
      <div className="fixed inset-0 -z-10">
        <img
          src="/image/t6.png"
          alt="background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      </div>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden py-6 sm:py-8 md:py-8">
        <div className="absolute inset-0 bg-gradient-to-r from-red-950 via-red-900 to-black opacity-60" />

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-bold sm:text-2xl md:text-3xl"
          >
            📢 Announcements
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto mt-2 max-w-xl text-xs text-gray-300 sm:text-sm"
          >
            Latest updates, news, and tournament announcements.
          </motion.p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 pb-12">
        {loading ? (
          <p className="text-center text-gray-300">Loading announcements...</p>
        ) : error ? (
          <div className="rounded-2xl bg-white/10 p-8 text-center backdrop-blur-md">
            <p className="text-red-400">{error}</p>
          </div>
        ) : announcements.length === 0 ? (
          <div className="rounded-2xl bg-white/10 p-8 sm:p-10 text-center backdrop-blur-md">
            <Megaphone className="mx-auto mb-3 text-yellow-400" />
            <p className="text-gray-300">No announcements available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {announcements.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="
                  rounded-2xl
                  border border-white/10
                  bg-white/10
                  p-4 sm:p-5 md:p-6
                  shadow-xl
                  backdrop-blur-md
                  transition
                "
              >
                {/* TITLE */}
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">
                  {item.title}
                </h3>

                {/* MESSAGE */}
                <p className="mt-3 text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {item.message}
                </p>

                {/* DATE */}
                <p className="mt-4 text-xs text-gray-400">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
