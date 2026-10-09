"use client";

import { useEffect, useState } from "react";

type MatchStatus = "UPCOMING" | "ONGOING" | "COMPLETED";

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: MatchStatus;
}

const API_URL = "http://localhost:5000/api/matches";

/**
 * SAFE JSON PARSER (fixes "<!DOCTYPE html>" crash)
 */
const safeJson = async (res: Response) => {
  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Server did not return JSON. Check backend API route.");
  }
};

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /**
   * GET TOKEN
   */
  const getToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  /**
   * FETCH MATCHES
   */
  useEffect(() => {
    let isMounted = true;

    const fetchMatches = async () => {
      try {
        setLoading(true);
        setError("");

        const token = getToken();

        if (!token) {
          throw new Error("No token found. Please login again.");
        }

        const res = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await safeJson(res);

        if (!res.ok) {
          throw new Error(result?.message || "Failed to fetch matches");
        }

        // SAFE mapping (prevents undefined crash)
        const formatted: Match[] = (result.data || []).map((m: any) => ({
          id: m.id,
          homeTeam: m.homeTeam || "Unknown",
          awayTeam: m.awayTeam || "Unknown",
          homeScore: m.homeScore,
          awayScore: m.awayScore,
          status: m.status,
        }));

        if (isMounted) setMatches(formatted);
      } catch (err: any) {
        if (isMounted) setError(err.message || "Something went wrong");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMatches();

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * UPDATE MATCH
   */
  const updateMatch = async (
    id: string,
    homeScore: number,
    awayScore: number,
    status: MatchStatus,
  ) => {
    try {
      const token = getToken();

      if (!token) throw new Error("No token found");

      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          homeScore,
          awayScore,
          status,
        }),
      });

      const result = await safeJson(res);

      if (!res.ok) {
        throw new Error(result?.message || "Update failed");
      }

      // optimistic UI update
      setMatches((prev) =>
        prev.map((m) =>
          m.id === id ? { ...m, homeScore, awayScore, status } : m,
        ),
      );
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <section className="py-8 text-center">
        <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
          Match Management
        </h1>
        <p className="mx-auto mt-1 max-w-xl text-xs text-gray-700 sm:text-sm">
          Manage live matches, scores, and results
        </p>
      </section>

      {/* ERROR */}
      {error && (
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-red-100 text-red-700 p-3 rounded text-sm">
            {error}
          </div>
        </div>
      )}

      {/* LOADING */}
      {loading ? (
        <p className="text-center text-gray-600">Loading matches...</p>
      ) : (
        <section className="max-w-6xl mx-auto px-4 space-y-4 pb-10">
          {matches.length === 0 ? (
            <div className="text-center bg-white p-10 rounded shadow">
              No matches found
            </div>
          ) : (
            matches.map((match) => (
              <div
                key={match.id}
                className="bg-white p-5 rounded-xl shadow flex flex-col lg:flex-row items-center justify-between gap-4"
              >
                {/* TEAMS */}
                <div className="font-bold text-lg">
                  {match.homeTeam} <span className="text-gray-400">vs</span>{" "}
                  {match.awayTeam}
                </div>

                {/* SCORE */}
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={match.homeScore}
                    onChange={(e) =>
                      setMatches((prev) =>
                        prev.map((m) =>
                          m.id === match.id
                            ? { ...m, homeScore: Number(e.target.value) }
                            : m,
                        ),
                      )
                    }
                    className="w-16 md:w-24 border rounded text-center"
                  />

                  <span>-</span>

                  <input
                    type="number"
                    value={match.awayScore}
                    onChange={(e) =>
                      setMatches((prev) =>
                        prev.map((m) =>
                          m.id === match.id
                            ? { ...m, awayScore: Number(e.target.value) }
                            : m,
                        ),
                      )
                    }
                    className="w-16 md:w-24 border rounded text-center"
                  />
                </div>

                {/* STATUS */}
                <select
                  value={match.status}
                  onChange={(e) =>
                    setMatches((prev) =>
                      prev.map((m) =>
                        m.id === match.id
                          ? {
                              ...m,
                              status: e.target.value as MatchStatus,
                            }
                          : m,
                      ),
                    )
                  }
                  className="border rounded px-2 py-1"
                >
                  <option value="UPCOMING">UPCOMING</option>
                  <option value="ONGOING">ONGOING</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>

                {/* SAVE */}
                <button
                  onClick={() =>
                    updateMatch(
                      match.id,
                      match.homeScore,
                      match.awayScore,
                      match.status,
                    )
                  }
                  className="bg-gradient-to-r from-red-950 via-red-900 to-black text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                  Save
                </button>
              </div>
            ))
          )}
        </section>
      )}
    </main>
  );
}
