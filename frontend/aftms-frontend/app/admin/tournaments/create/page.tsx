"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTournamentPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    location: "",
    fee: "",
    maxTeams: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      setError("You are not logged in");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        name: form.name.trim(),
        location: form.location.trim(),
        fee: Number(form.fee),
        maxTeams: Number(form.maxTeams),
        startDate: form.startDate,
        endDate: form.endDate,
      };

      if (payload.fee <= 0 || payload.maxTeams <= 0) {
        throw new Error(
          "Registration fee and max teams must be greater than 0",
        );
      }

      const res = await fetch(
        "http://localhost:5000/api/tournaments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const text = await res.text();

      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        throw new Error("Server returned invalid response");
      }

      if (!res.ok) {
        throw new Error(data?.message || "Failed to create tournament");
      }

      router.push("/admin/tournaments");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HEADER (ABOUT STYLE) */}
      <section className="relative overflow-hidden py-8 sm:py-10">
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center text-black">
          <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
            Create Tournament
          </h1>

          <p className="mx-auto mt-2 max-w-xl text-xs text-gray-800 sm:text-sm">
            Build competition. Manage teams. Control the game.
          </p>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="mx-auto max-w-4xl px-4 py-8 sm:py-10">
        <div className="mx-auto w-full max-w-2xl bg-white rounded-2xl shadow-md border border-gray-100 p-5 sm:p-6 md:p-8">
          {/* ERROR */}
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-xs sm:text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* GRID INPUTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <input
                name="name"
                placeholder="Tournament Name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-900"
                required
              />

              <input
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-900"
                required
              />

              <input
                type="number"
                name="fee"
                placeholder="Registration Fee"
                value={form.fee}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-900"
                required
              />

              <input
                type="number"
                name="maxTeams"
                placeholder="Max Teams"
                value={form.maxTeams}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-900"
                required
              />

              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-900"
                required
              />

              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-900"
                required
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-950 via-red-900 to-black text-white py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Tournament"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
