"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

// ✅ Single API URL
const API_URL = "http://localhost:5000/api";

export default function TournamentsPage() {
  const router = useRouter();

  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTournaments = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/tournaments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch tournaments");
      }

      setTournaments(data.data ?? []);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  // ===============================
  // TOGGLE STATUS
  // ===============================
  const toggleStatus = async (id: string, status: string) => {
    try {
      const token = localStorage.getItem("token");

      const newStatus = status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

      const res = await fetch(`${API_URL}/tournaments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      setTournaments((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                status: data.data.status,
              }
            : t,
        ),
      );
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <section className="relative overflow-hidden py-8 sm:py-10">
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center text-black">
          <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
            Tournaments
          </h1>

          <p className="mx-auto mt-1 max-w-xl text-xs text-gray-700 sm:text-sm">
            Manage competitions, teams, schedules, and performance in one place.
          </p>

          <div className="mt-5 flex justify-start">
            <button
              onClick={() => router.push("/admin/tournaments/create")}
              className="rounded-lg bg-gradient-to-r from-red-950 via-red-900 to-black px-5 py-2.5 text-xs text-white shadow transition hover:opacity-90 sm:text-sm"
            >
              + Create Tournament
            </button>
          </div>
        </div>
      </section>

      {/* ERROR */}
      {error && (
        <div className="mx-auto mt-4 max-w-5xl px-4">
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700 sm:text-sm">
            {error}
          </div>
        </div>
      )}

      {/* LOADING */}
      {loading ? (
        <div className="mx-auto mt-4 max-w-5xl px-4 text-sm text-gray-600">
          Loading tournaments...
        </div>
      ) : (
        <section className="mx-auto max-w-6xl px-4 py-4">
          {tournaments.length === 0 ? (
            <div className="rounded-xl bg-white py-12 text-center text-sm text-gray-500 shadow-sm sm:text-base">
              No tournaments found.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
              {tournaments.map((t) => (
                <div
                  key={t.id}
                  className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                        {t.name}
                      </h2>

                      <span
                        className={`rounded-full px-2 py-1 text-[10px] font-medium sm:text-xs ${
                          t.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {t.status}
                      </span>
                    </div>

                    <div className="mt-3 space-y-1 text-xs text-gray-600 sm:text-sm">
                      <p>📍 {t.location}</p>
                      <p>💰 Fee: {t.fee}</p>
                      <p>👥 Max Teams: {t.maxTeams}</p>
                      <p>
                        📅 {t.startDate} → {t.endDate}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}
