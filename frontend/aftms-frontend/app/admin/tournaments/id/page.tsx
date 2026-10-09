"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Tournament = {
  id: string;
  name: string;
  location: string;
  fee: number;
  maxTeams: number;
  startDate: string;
  endDate: string;
  status: "ACTIVE" | "INACTIVE";
};

type Team = {
  id: string;
  teamName: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
};

type Match = {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: "UPCOMING" | "ONGOING" | "COMPLETED";
};

export default function TournamentDetailsPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found. Please login again.");
        }

        if (!id) {
          throw new Error("Tournament ID is missing");
        }

        const res = await fetch(
          `https://aftms.onrender.com/api/tournaments/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(data?.message || "Failed to load tournament");
        }

        if (isMounted) {
          setTournament(data.data.tournament);
          setTeams(data.data.teams || []);
          setMatches(data.data.matches || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Something went wrong");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Tournament Details</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-6">
          {/* TOURNAMENT INFO */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold">{tournament?.name}</h2>

            <p className="text-gray-600">Location: {tournament?.location}</p>

            <p className="text-gray-600">Fee: {tournament?.fee}</p>

            <p className="text-gray-600">Teams: {tournament?.maxTeams}</p>

            <p className="text-gray-600">
              {tournament?.startDate} → {tournament?.endDate}
            </p>

            <p className="mt-2">
              Status:{" "}
              <span
                className={
                  tournament?.status === "ACTIVE"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {tournament?.status}
              </span>
            </p>
          </div>

          {/* TEAMS */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-bold mb-3">Teams</h2>

            {teams.length === 0 ? (
              <p>No teams found</p>
            ) : (
              <div className="space-y-2">
                {teams.map((t) => (
                  <div
                    key={t.id}
                    className="flex justify-between border p-3 rounded"
                  >
                    <span>{t.teamName}</span>
                    <span
                      className={
                        t.status === "APPROVED"
                          ? "text-green-600"
                          : t.status === "REJECTED"
                            ? "text-red-600"
                            : "text-yellow-600"
                      }
                    >
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* MATCHES */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-bold mb-3">Matches</h2>

            {matches.length === 0 ? (
              <p>No matches found</p>
            ) : (
              <div className="space-y-2">
                {matches.map((m) => (
                  <div
                    key={m.id}
                    className="flex justify-between border p-3 rounded"
                  >
                    <span>
                      {m.homeTeam} vs {m.awayTeam}
                    </span>

                    <span>
                      {m.homeScore} - {m.awayScore}
                    </span>

                    <span
                      className={
                        m.status === "COMPLETED"
                          ? "text-green-600"
                          : m.status === "ONGOING"
                            ? "text-blue-600"
                            : "text-gray-500"
                      }
                    >
                      {m.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
