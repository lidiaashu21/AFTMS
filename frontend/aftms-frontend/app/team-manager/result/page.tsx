"use client";

import { useEffect, useState } from "react";

type MatchStatus = "UPCOMING" | "ONGOING" | "COMPLETED";

interface Result {
  id: string;

  homeTeam: string;

  awayTeam: string;

  homeScore: number;

  awayScore: number;

  status: MatchStatus;

  createdAt?: string;
}

export default function TeamResultsPage() {
  const [results, setResults] = useState<Result[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);

        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found");
        }

        const res = await fetch("http://localhost:5000/api/matches", {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();

        console.log("BACKEND RESPONSE:", json);

        if (!res.ok) {
          throw new Error(json?.message || "Failed to fetch matches");
        }

        const formatted: Result[] = (
          Array.isArray(json.data) ? json.data : []
        ).map((match: any) => ({
          id: String(match.id),

          homeTeam: match.homeTeam || "Unknown Home Team",

          awayTeam: match.awayTeam || "Unknown Away Team",

          homeScore: Number(match.homeScore ?? 0),

          awayScore: Number(match.awayScore ?? 0),

          status: match.status || "UPCOMING",

          createdAt: match.createdAt || "",
        }));

        console.log("DISPLAY RESULTS:", formatted);

        setResults(formatted);
      } catch (err: any) {
        console.error("RESULT ERROR:", err);

        setError(err.message || "Failed to load results");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const statusColor = (status: MatchStatus) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";

      case "ONGOING":
        return "bg-blue-100 text-blue-700";

      case "UPCOMING":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="py-8 text-center">
        <h1
          className="
        text-xl
        font-bold
        sm:text-2xl
        md:text-3xl
        text-gray-900
      "
        >
          Match Results
        </h1>

        <p
          className="
        mt-2
        text-sm
        text-gray-600
      "
        >
          View football match results
        </p>
      </section>

      {error && (
        <div className="mx-auto max-w-4xl px-4">
          <div
            className="
          rounded-lg
          bg-red-100
          p-3
          text-center
          text-red-700
        "
          >
            {error}
          </div>
        </div>
      )}

      {loading ? (
        <div
          className="
        mt-10
        text-center
        text-gray-600
      "
        >
          Loading results...
        </div>
      ) : results.length === 0 ? (
        <div
          className="
        mx-auto
        max-w-4xl
        rounded-xl
        bg-white
        p-10
        text-center
        text-gray-500
        shadow
      "
        >
          No matches found
        </div>
      ) : (
        <section
          className="
        mx-auto
        max-w-5xl
        px-4
        py-6
        space-y-5
      "
        >
          {results.map((r) => (
            <div
              key={r.id}
              className="
              overflow-hidden
              rounded-2xl
              bg-white
              shadow-lg
              border
              border-gray-100
            "
            >
              {/* TOP STATUS */}

              <div
                className="
              flex
              flex-col
              gap-3
              bg-gray-50
              px-5
              py-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
              >
                <div>
                  <p
                    className="
                  text-xs
                  uppercase
                  tracking-wide
                  text-gray-500
                "
                  >
                    Match Status
                  </p>

                  <h2
                    className="
                  text-lg
                  font-bold
                  text-gray-800
                "
                  >
                    {r.homeTeam}
                    <span className="mx-2 text-gray-400">vs</span>
                    {r.awayTeam}
                  </h2>
                </div>

                <div
                  className="
                flex
                items-center
                gap-2
              "
                >
                  <span
                    className="
                  text-xs
                  font-semibold
                  text-gray-500
                "
                  >
                    STATUS:
                  </span>

                  <span
                    className={`
                    rounded-full
                    px-4
                    py-1.5
                    text-xs
                    font-bold
                    ${statusColor(r.status)}
                  `}
                  >
                    {r.status}
                  </span>
                </div>
              </div>

              {/* MATCH SCORE */}

              <div
                className="
              grid
              grid-cols-3
              items-center
              gap-3
              px-5
              py-8
              sm:px-10
            "
              >
                {/* HOME TEAM */}

                <div
                  className="
                text-center
              "
                >
                  <p
                    className="
                  mb-2
                  text-xs
                  font-bold
                  uppercase
                  text-blue-600
                "
                  >
                    Home
                  </p>

                  <h3
                    className="
                  break-words
                  text-base
                  font-bold
                  text-gray-900
                  sm:text-xl
                "
                  >
                    {r.homeTeam}
                  </h3>
                </div>

                {/* SCORE */}

                <div
                  className="
                text-center
              "
                >
                  <p
                    className="
                  text-xs
                  uppercase
                  text-gray-400
                  mb-2
                "
                  >
                    Score
                  </p>

                  <div
                    className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-3xl
                  font-black
                  text-gray-900
                  sm:text-4xl
                "
                  >
                    <span>{r.homeScore}</span>

                    <span
                      className="
                    text-gray-400
                  "
                    >
                      -
                    </span>

                    <span>{r.awayScore}</span>
                  </div>
                </div>

                {/* AWAY TEAM */}

                <div
                  className="
                text-center
              "
                >
                  <p
                    className="
                  mb-2
                  text-xs
                  font-bold
                  uppercase
                  text-red-600
                "
                  >
                    Away
                  </p>

                  <h3
                    className="
                  break-words
                  text-base
                  font-bold
                  text-gray-900
                  sm:text-xl
                "
                  >
                    {r.awayTeam}
                  </h3>
                </div>
              </div>

              {/* FOOTER */}

              <div
                className="
              border-t
              bg-gray-50
              px-5
              py-3
              text-center
            "
              >
                <p
                  className="
                text-xs
                text-gray-500
              "
                >
                  Match Result
                </p>
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
