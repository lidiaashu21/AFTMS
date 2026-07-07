"use client";

import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { getMatches } from "../../service/match.service";

interface Match {
  id: string;

  fixtureId: string;

  homeTeam: string;

  awayTeam: string;

  homeScore: number;

  awayScore: number;

  status: string;

  createdAt?: string;
}

export default function ResultsPage() {
  const [matches, setMatches] = useState<Match[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchResults = async () => {
    try {
      setLoading(true);

      setError("");

      const response: any = await getMatches();

      console.log("BACKEND RESPONSE:", response);

      // FIX: backend returns array directly
      const raw = Array.isArray(response) ? response : response?.data || [];

      if (!Array.isArray(raw)) {
        throw new Error("Invalid match response");
      }

      const formattedMatches: Match[] = raw.map((match: any) => ({
        id: String(match.id),

        fixtureId: match.fixtureName || match.fixtureId || "Unknown Fixture",

        homeTeam: match.homeTeam || "Unknown Home Team",

        awayTeam: match.awayTeam || "Unknown Away Team",

        homeScore: Number(match.homeScore ?? 0),

        awayScore: Number(match.awayScore ?? 0),

        status: String(match.status || "UNKNOWN").toUpperCase(),

        createdAt: match.createdAt || "",
      }));

      console.log("DISPLAY MATCHES:", formattedMatches);

      setMatches(formattedMatches);
    } catch (err: any) {
      console.error("FETCH MATCH ERROR:", err);

      setError(err.message || "Failed to load matches");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();

    const timer = setInterval(fetchResults, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main
      className="
      relative
      min-h-screen
      text-white
      "
    >
      {/* BACKGROUND */}

      <div
        className="
        fixed
        inset-0
        -z-10
        "
      >
        <img
          src="/image/t6.png"
          alt="background"
          className="
          w-full
          h-full
          object-cover
          "
        />

        <div
          className="
          absolute
          inset-0
          bg-black/70
          backdrop-blur-sm
          "
        />
      </div>

      {/* HEADER */}

      <section
        className="
        py-6
        text-center
        "
      >
        <motion.h1
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
          text-2xl
          md:text-3xl
          font-bold
          "
        >
          🏆 Results
        </motion.h1>
      </section>

      <section
        className="
        max-w-5xl
        mx-auto
        px-4
        pb-10
        "
      >
        {loading ? (
          <p
            className="
              text-center
              "
          >
            Loading matches...
          </p>
        ) : error ? (
          <div
            className="
              bg-red-500/20
              rounded-xl
              p-5
              text-center
              "
          >
            {error}
          </div>
        ) : matches.length === 0 ? (
          <div
            className="
              bg-white/10
              rounded-xl
              p-10
              text-center
              "
          >
            <Trophy
              className="
                mx-auto
                text-yellow-400
                mb-3
                "
            />
            No matches found
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-5
              "
          >
            {matches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.05,
                }}
                className="
                    bg-white/10
                    border
                    border-white/10
                    rounded-xl
                    p-5
                    backdrop-blur-md
                    "
              >
                {/* MATCH */}

                <div
                  className="
                      flex
                      justify-between
                      items-center
                      text-center
                      "
                >
                  <div>
                    <p
                      className="
                          text-xs
                          text-gray-300
                          "
                    >
                      Home Team
                    </p>

                    <h2
                      className="
                          font-bold
                          text-lg
                          "
                    >
                      {match.homeTeam}
                    </h2>
                  </div>

                  <div
                    className="
                        text-3xl
                        font-bold
                        text-green-400
                        "
                  >
                    {match.homeScore}-{match.awayScore}
                  </div>

                  <div>
                    <p
                      className="
                          text-xs
                          text-gray-300
                          "
                    >
                      Away Team
                    </p>

                    <h2
                      className="
                          font-bold
                          text-lg
                          "
                    >
                      {match.awayTeam}
                    </h2>
                  </div>
                </div>

                {/* STATUS */}

                <div
                  className="
                      mt-5
                      bg-white/10
                      rounded-lg
                      p-3
                      text-center
                      "
                >
                  <p
                    className="
                        text-xs
                        text-gray-300
                        "
                  >
                    Match Status
                  </p>

                  <p
                    className="
                        font-semibold
                        text-green-300
                        "
                  >
                    {match.status}
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
