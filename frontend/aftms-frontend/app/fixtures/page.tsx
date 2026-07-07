"use client";

import { useEffect, useState } from "react";
import { CalendarDays, MapPin, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { getFixtures } from "../../service/fixture.service";

/**
 * FIXED TYPES (match backend Prisma include)
 */
interface Team {
  id: string;
  name: string;
  coachName?: string;
  contactEmail?: string;
  createdAt?: string;
}

interface Tournament {
  id: string;
  name: string;
  location?: string;
}

interface Fixture {
  id: string;
  fixtureDate: string;
  status?: string;

  homeTeam: Team;
  awayTeam: Team;
  tournament?: Tournament;
}

export default function FixturesPage() {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFixtures = async () => {
      try {
        setLoading(true);

        const res = await getFixtures();

        console.log("API RESPONSE:", res);

        const data = Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res)
            ? res
            : [];

        setFixtures(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load fixtures");
        setFixtures([]);
      } finally {
        setLoading(false);
      }
    };

    loadFixtures();
  }, []);

  return (
    <main className="relative min-h-screen text-white">
      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <img
          src="/image/t6.png"
          alt="background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden py-6 sm:py-8 md:py-8">
        <div className="absolute inset-0 bg-gradient-to-r from-red-950 via-red-900 to-black opacity-60" />

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-bold sm:text-2xl md:text-3xl"
          >
            📅 Fixtures
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 text-xs text-gray-300 sm:text-sm"
          >
            View all scheduled football matches in tournaments.
          </motion.p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-4 py-6 pb-12">
        {loading ? (
          <p className="text-center text-gray-300">Loading fixtures...</p>
        ) : error ? (
          <div className="rounded-2xl bg-white/10 p-8 text-center backdrop-blur-md">
            <Trophy className="mx-auto mb-3 text-red-400" />
            <p>{error}</p>
          </div>
        ) : fixtures.length === 0 ? (
          <div className="rounded-2xl bg-white/10 p-8 text-center backdrop-blur-md">
            <Trophy className="mx-auto mb-3 text-yellow-400" />
            <p>No fixtures available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fixtures.map((fixture, index) => (
              <motion.div
                key={fixture.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md"
              >
                {/* STATUS */}
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-yellow-300">
                    <Trophy size={16} className="inline mr-1" />
                    {fixture.status || "UPCOMING"}
                  </span>
                </div>

                {/* HOME TEAM */}
                <h2 className="text-center text-lg font-bold">
                  {fixture.homeTeam?.name}
                </h2>

                <p className="my-3 text-center text-2xl font-bold text-green-400">
                  VS
                </p>

                {/* AWAY TEAM */}
                <h2 className="text-center text-lg font-bold">
                  {fixture.awayTeam?.name}
                </h2>

                {/* DATE */}
                <div className="mt-4 space-y-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    <span>
                      {fixture.fixtureDate
                        ? new Date(fixture.fixtureDate).toLocaleString()
                        : "No date"}
                    </span>
                  </div>

                  {/* VENUE (from tournament) */}
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{fixture.tournament?.location || "No venue"}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
