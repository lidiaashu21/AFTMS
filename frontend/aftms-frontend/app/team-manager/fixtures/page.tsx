"use client";

import { useEffect, useState } from "react";

type MatchStatus = "UPCOMING" | "ONGOING" | "COMPLETED";

interface Team {
  id: string;
  name: string;
  coachName?: string;
  contactEmail?: string;
}

interface Fixture {
  id: string;

  homeTeam: Team;

  awayTeam: Team;

  fixtureDate: string;

  venue: string;

  homeScore: number;

  awayScore: number;

  status: MatchStatus;
}

export default function TeamFixturesPage() {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const formatDate = (date?: string) => {
    if (!date) {
      return "Date not available";
    }

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      return "Invalid date";
    }

    return parsedDate.toLocaleString();
  };

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        setLoading(true);

        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found. Please login again.");
        }

        const res = await fetch("https://aftms.onrender.com/api/fixtures", {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();

        console.log("FIXTURE API RESPONSE:", json);

        if (!res.ok) {
          throw new Error(json?.message || "Failed to fetch fixtures");
        }

        const formatted: Fixture[] = (
          Array.isArray(json.data) ? json.data : []
        ).map((f: any) => ({
          id: String(f.id),

          homeTeam: {
            id: String(f.homeTeam?.id || ""),

            name: f.homeTeam?.name || "Unknown Team",
          },

          awayTeam: {
            id: String(f.awayTeam?.id || ""),

            name: f.awayTeam?.name || "Unknown Team",
          },

          fixtureDate: f.fixtureDate || f.matchDate || "",

          venue: f.venue || "Unknown Venue",

          homeScore: Number(f.homeScore ?? 0),

          awayScore: Number(f.awayScore ?? 0),

          status: f.status || "UPCOMING",
        }));

        console.log("FORMATTED FIXTURES:", formatted);

        setFixtures(formatted);
      } catch (err: any) {
        console.error("FIXTURE ERROR:", err);

        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchFixtures();
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
        "
        >
          My Fixtures
        </h1>

        <p
          className="
          mt-3
          text-sm
          text-gray-600
        "
        >
          View upcoming and completed matches
        </p>
      </section>

      {error && (
        <div
          className="
          mx-auto
          max-w-4xl
          px-4
        "
        >
          <div
            className="
            rounded-lg
            border
            border-red-200
            bg-red-50
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
          mt-6
          text-center
        "
        >
          Loading fixtures...
        </div>
      ) : fixtures.length === 0 ? (
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
          No fixtures available yet
        </div>
      ) : (
        <section
          className="
          mx-auto
          max-w-4xl
          px-4
          py-6
          space-y-4
        "
        >
          {fixtures.map((f) => (
            <div
              key={f.id}
              className="
              overflow-hidden
              rounded-xl
              bg-white
              shadow-md
              "
            >
              <div
                className="
                flex
                flex-col
                gap-3
                bg-gray-100
                px-5
                py-4
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
              >
                <div>
                  <h2
                    className="
                    text-base
                    font-semibold
                    text-gray-800
                  "
                  >
                    {f.homeTeam.name}

                    <span className="mx-2 text-gray-400">vs</span>

                    {f.awayTeam.name}
                  </h2>

                  <p
                    className="
                    mt-1
                    text-xs
                    text-gray-500
                  "
                  >
                    📍 {f.venue}
                  </p>

                  <p
                    className="
                    text-xs
                    text-gray-500
                  "
                  >
                    🗓 {formatDate(f.fixtureDate)}
                  </p>
                </div>

                <span
                  className={`
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  ${statusColor(f.status)}
                  `}
                >
                  {f.status}
                </span>
              </div>

              <div
                className="
                flex
                items-center
                justify-between
                px-6
                py-5
              "
              >
                <div
                  className="
                  text-2xl
                  font-bold
                "
                >
                  {f.homeScore}
                </div>

                <div
                  className="
                  text-xs
                  text-gray-500
                "
                >
                  SCORE
                </div>

                <div
                  className="
                  text-2xl
                  font-bold
                "
                >
                  {f.awayScore}
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
