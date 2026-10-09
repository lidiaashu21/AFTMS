"use client";

import { useEffect, useState } from "react";

interface Team {
  id: string;
  name: string;
}

interface Tournament {
  id: string;
  name: string;
}

interface Fixture {
  id: string;
  fixtureDate: string;
  homeTeam: Team;
  awayTeam: Team;
  tournament: Tournament;
}

export default function AdminFixturesPage() {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    tournamentId: "",
    homeTeamId: "",
    awayTeamId: "",
    matchDate: "",
  });

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // ================= FETCH =================
  const fetchData = async () => {
    try {
      setLoading(true);

      const [fRes, tRes, teamRes] = await Promise.all([
        fetch("http://localhost:5000/api/fixtures"),
        fetch("http://localhost:5000/api/tournaments"),
        fetch("http://localhost:5000/api/teams"),
      ]);

      const fJson = await fRes.json();
      const tJson = await tRes.json();
      const teamJson = await teamRes.json();

      setFixtures(fJson?.data || []);
      setTournaments(tJson?.data || []);
      setTeams(teamJson?.data || []);
    } catch {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= CREATE =================

  const createFixture = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/fixtures", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || ""}`,
        },
        body: JSON.stringify(form),
      });

      const json = await res.json();

      console.log("CREATE RESPONSE:", json);

      if (!res.ok) {
        throw new Error(json.message || "Create failed");
      }

      // refresh from database
      await fetchData();

      resetForm();

      alert("Fixture created successfully");
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    }
  };
  // ================= DELETE =================
  const deleteFixture = async (id: string) => {
    if (!confirm("Delete this fixture?")) return;

    const res = await fetch(
      `http://localhost:5000/api/fixtures/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token || ""}` },
      },
    );

    if (!res.ok) return alert("Delete failed");

    setFixtures((prev) => prev.filter((f) => f.id !== id));
  };

  // ================= EDIT =================
  const startEdit = (f: Fixture) => {
    setEditingId(f.id);

    setForm({
      tournamentId: f.tournament?.id || "",
      homeTeamId: f.homeTeam?.id || "",
      awayTeamId: f.awayTeam?.id || "",
      matchDate: f.fixtureDate?.slice(0, 16),
    });
  };

  // ================= UPDATE =================
  const updateFixture = async () => {
    if (!editingId) return;

    const res = await fetch(
      `http://localhost:5000/api/fixtures/${editingId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || ""}`,
        },
        body: JSON.stringify(form),
      },
    );

    const json = await res.json();

    if (!res.ok) return alert(json.message);

    setFixtures((prev) =>
      prev.map((f) => (f.id === editingId ? json.data : f)),
    );

    resetForm();
    setEditingId(null);
  };

  const resetForm = () => {
    setForm({
      tournamentId: "",
      homeTeamId: "",
      awayTeamId: "",
      matchDate: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* CONTAINER (SMALL DESKTOP + PERFECT MOBILE) */}
      <div className="mx-auto max-w-4xl px-3 sm:px-4 py-5 sm:py-6">
        {/* HEADER */}
        <div className="mb-4">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">
            Fixture Management
          </h1>
          <p className="text-xs text-gray-500">Create and manage fixtures</p>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 mb-4 space-y-2">
          <select
            className="
    w-full
    min-w-0
    h-10
    sm:h-11
    border
    rounded-lg
    px-2
    sm:px-3
    py-2
    text-base
    sm:text-sm
    truncate
    bg-white
    text-gray-900
    box-border
    focus:outline-none
    focus:ring-2
    focus:ring-gray-300
  "
            value={form.tournamentId}
            onChange={(e) => setForm({ ...form, tournamentId: e.target.value })}
          >
            <option value="">Tournament</option>

            {tournaments.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
          <select
            className="
    w-full
    min-w-0
    h-10
    sm:h-11
    border
    rounded-lg
    px-2
    sm:px-3
    py-2
    text-base
    sm:text-sm
    truncate
    bg-white
    text-gray-900
    box-border
    focus:outline-none
    focus:ring-2
    focus:ring-gray-300
  "
            value={form.homeTeamId}
            onChange={(e) => setForm({ ...form, homeTeamId: e.target.value })}
          >
            <option value="">Home Team</option>

            {teams.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          <select
            className="
    w-full
    min-w-0
    h-10
    sm:h-11
    border
    rounded-lg
    px-2
    sm:px-3
    py-2
    text-base
    sm:text-sm
    truncate
    bg-white
    text-gray-900
    box-border
    focus:outline-none
    focus:ring-2
    focus:ring-gray-300
  "
            value={form.awayTeamId}
            onChange={(e) => setForm({ ...form, awayTeamId: e.target.value })}
          >
            <option value="">Away Team</option>

            {teams.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          <input
            type="datetime-local"
            className="w-full border rounded-lg p-2 text-sm"
            value={form.matchDate}
            onChange={(e) => setForm({ ...form, matchDate: e.target.value })}
          />

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            {editingId ? (
              <button
                onClick={updateFixture}
                className="w-full sm:w-auto bg-gradient-to-r from-red-950 via-red-900 to-black text-white px-4 py-2 rounded-lg text-sm"
              >
                Update
              </button>
            ) : (
              <button
                onClick={createFixture}
                className="w-full sm:w-auto bg-gradient-to-r from-red-950 via-red-900 to-black text-white px-4 py-2 rounded-lg text-sm"
              >
                Create
              </button>
            )}

            <button
              onClick={() => {
                resetForm();
                setEditingId(null);
              }}
              className="w-full sm:w-auto bg-gray-200 px-4 py-2 rounded-lg text-sm"
            >
              Reset
            </button>
          </div>
        </div>

        {/* ERROR */}
        {error && <div className="text-red-600 text-xs mb-3">{error}</div>}

        {/* LIST */}
        {loading ? (
          <p className="text-xs text-gray-900">Loading...</p>
        ) : (
          <div className="space-y-2">
            {fixtures.map((f) => (
              <div
                key={f.id}
                className="bg-white border border-gray-100 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
              >
                <div>
                  <p className="font-semibold text-sm">
                    {f.homeTeam?.name} vs {f.awayTeam?.name}
                  </p>
                  <p className="text-xs text-gray-500">{f.tournament?.name}</p>
                  <p className="text-[11px] text-gray-400">
                    {new Date(f.fixtureDate).toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(f)}
                    className="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteFixture(f.id)}
                    className="px-3 py-1 text-xs bg-red-800 text-white rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
