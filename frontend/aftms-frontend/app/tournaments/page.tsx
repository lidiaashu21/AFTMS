"use client";

import { useEffect, useState } from "react";
import { Trophy, CalendarDays, Users } from "lucide-react";
import { motion } from "framer-motion";
import api from "../../service/api";

interface Tournament {
  id: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  maxTeams: number;
  status: "ACTIVE" | "UPCOMING" | "COMPLETED";
}

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setLoading(true);

        const res = await api.get("/tournaments");

        // ✅ SAFE DATA HANDLING (prevents crashes)
        const raw = res?.data?.data ?? res?.data ?? res ?? [];

        if (!Array.isArray(raw)) {
          console.error("Unexpected API response:", res);
          setError("Invalid data format from server");
          setTournaments([]);
          return;
        }

        setTournaments(raw);
      } catch (error) {
        console.error(error);
        setError("Failed to load tournaments");
        setTournaments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
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
            transition={{ duration: 0.5 }}
            className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-3xl"
          >
            🏆 Tournaments
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-2 max-w-xl text-xs text-gray-300 sm:text-sm md:text-base"
          >
            Explore, join, and track football tournaments in one professional
            platform.
          </motion.p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 pb-12">
        {loading ? (
          <p className="text-center text-gray-300 text-sm sm:text-base">
            Loading tournaments...
          </p>
        ) : error ? (
          <div className="rounded-2xl bg-white/10 p-8 text-center backdrop-blur-md">
            <p className="text-red-400">{error}</p>
          </div>
        ) : tournaments.length === 0 ? (
          <div className="rounded-2xl bg-white/10 p-8 sm:p-10 text-center backdrop-blur-md">
            <Trophy className="mx-auto mb-3 text-yellow-400" />
            <p className="text-gray-300 text-sm sm:text-base">
              No tournaments available
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {tournaments.map((tournament, index) => (
              <motion.div
                key={tournament.id}
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
                {/* Title */}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white leading-snug">
                    {tournament.name}
                  </h3>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-[10px] sm:text-xs font-semibold ${
                      tournament.status === "ACTIVE"
                        ? "bg-green-500/20 text-green-300"
                        : tournament.status === "UPCOMING"
                          ? "bg-blue-500/20 text-blue-300"
                          : "bg-gray-500/20 text-gray-300"
                    }`}
                  >
                    {tournament.status}
                  </span>
                </div>

                {/* Info */}
                <div className="mt-4 space-y-2 text-xs sm:text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    <span className="leading-relaxed">
                      {new Date(tournament.startDate).toLocaleDateString()} -{" "}
                      {new Date(tournament.endDate).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>Max Teams: {tournament.maxTeams}</span>
                  </div>

                  <p className="text-gray-400 break-words">
                    📍 {tournament.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
