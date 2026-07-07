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

export default function TournamentsPage() {
  const router = useRouter();

  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchTournaments = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:5000/api/tournaments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch");

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

  const toggleStatus = async (id: string, status: string) => {
    try {
      const newStatus = status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

      const res = await fetch(`http://localhost:5000/api/tournaments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Update failed");

      setTournaments((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: data.data.status } : t)),
      );
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HEADER (CLEAN + LESS GAP) */}
      <section className="relative overflow-hidden py-8 sm:py-10">
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center text-black">
          <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
            Tournaments
          </h1>

          <p className="mx-auto mt-1 max-w-xl text-xs text-gray-700 sm:text-sm">
            Manage competitions, teams, schedules, and performance in one place
          </p>

          {/* 🔥 REDUCED GAP HERE */}
          <div className="mt-5 flex justify-start">
            <button
              onClick={() => router.push("/admin/tournaments/create")}
              className="bg-gradient-to-r from-red-950 via-red-900 to-black text-white text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow hover:opacity-90 transition"
            >
              + Create Tournament
            </button>
          </div>
        </div>
      </section>

      {/* ERROR */}
      {error && (
        <div className="mx-auto max-w-5xl px-4 mt-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-xs sm:text-sm">
            {error}
          </div>
        </div>
      )}

      {/* LOADING */}
      {loading ? (
        <div className="mx-auto max-w-5xl px-4 mt-2 text-gray-600 text-sm">
          Loading tournaments...
        </div>
      ) : (
        /* GRID FIXED (PROFESSIONAL UI) */
        <section className="mx-auto max-w-6xl px-4 py-4 sm:py-4">
          {tournaments.length === 0 && (
            <div className="text-center text-gray-500 py-12 bg-white rounded-xl shadow-sm text-sm sm:text-base">
              No tournaments found
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {tournaments.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between"
              >
                {/* TOP INFO */}
                <div>
                  <div className="flex justify-between items-start">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">
                      {t.name}
                    </h2>

                    <span
                      className={`text-[10px] sm:text-xs px-2 py-1 rounded-full font-medium ${
                        t.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>

                  <div className="mt-3 space-y-1 text-xs sm:text-sm text-gray-600">
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
        </section>
      )}
    </main>
  );
}
