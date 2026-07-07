"use client";

import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { motion } from "framer-motion";

interface Match {
  id: string;

  fixtureId: string;

  homeTeam: string;

  awayTeam: string;

  homeScore: number;

  awayScore: number;

  status: "UPCOMING" | "ONGOING" | "COMPLETED";

  createdAt?: string;
}

const API_URL = "http://localhost:5000/api/matches";

const safeJson = async (res: Response) => {
  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Server did not return JSON");
  }
};

export default function ResultsPage() {
  const [matches, setMatches] = useState<Match[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const getToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchMatches = async () => {
    try {
      setLoading(true);

      setError("");

      const token = getToken();

      const res = await fetch(API_URL, {
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await safeJson(res);

      console.log("API RESPONSE:", result);

      if (!res.ok) {
        throw new Error(result?.message || "Failed to fetch matches");
      }

      /*
        BACKEND RESPONSE:

        {
          success:true,
          data:[
            {
              id,
              fixtureId,
              homeTeam,
              awayTeam,
              homeScore,
              awayScore,
              status
            }
          ]
        }

      */

      const formatted: Match[] = (
        Array.isArray(result.data) ? result.data : []
      ).map((match: any) => ({
        id: String(match.id),

        fixtureId: match.fixtureId || "Unknown Fixture",

        homeTeam: match.homeTeam || "Unknown Home Team",

        awayTeam: match.awayTeam || "Unknown Away Team",

        homeScore: Number(match.homeScore ?? 0),

        awayScore: Number(match.awayScore ?? 0),

        status: match.status || "UPCOMING",

        createdAt: match.createdAt || "",
      }));

      console.log("DISPLAY MATCHES:", formatted);

      setMatches(formatted);
    } catch (err: any) {
      console.error("FETCH ERROR:", err);

      setError(err.message || "Failed to load matches");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();

    const timer = setInterval(fetchMatches, 5000);

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
          🏆 Match Results
        </motion.h1>

        <p
          className="
          text-gray-300
          mt-2
          "
        >
          Football fixture results
        </p>
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
          <p className="text-center">Loading matches...</p>
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
                <div
                  className="
                  flex
                  items-center
                  gap-2
                  text-yellow-300
                  mb-4
                  "
                >
                  <Trophy size={16} />
                  Fixture
                </div>

                <div
                  className="
                  bg-black/20
                  rounded-lg
                  p-3
                  mb-5
                  text-center
                  "
                >
                  <p
                    className="
                    text-xs
                    text-gray-300
                    "
                  >
                    Fixture ID
                  </p>

                  <p className="break-all">{match.fixtureId}</p>
                </div>

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

                    <h2 className="font-bold text-lg">{match.homeTeam}</h2>
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

                    <h2 className="font-bold text-lg">{match.awayTeam}</h2>
                  </div>
                </div>

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
                    Status
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
