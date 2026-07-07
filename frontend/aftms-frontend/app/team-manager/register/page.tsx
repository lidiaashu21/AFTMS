"use client";

import { useEffect, useState } from "react";

interface Tournament {
  id: string;
  name: string;
}

export default function TeamRegisterPaymentPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  const [form, setForm] = useState({
    teamName: "",
    coachName: "",
    coachEmail: "",
    transactionNumber: "",
    amount: 500,
    tournamentId: "",
  });

  const [receipt, setReceipt] = useState<File | null>(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/tournaments");
        const json = await res.json();
        setTournaments(json?.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTournaments();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("teamName", form.teamName);
      formData.append("coachName", form.coachName);
      formData.append("coachEmail", form.coachEmail);
      formData.append("transactionNumber", form.transactionNumber);
      formData.append("amount", String(form.amount));
      formData.append("tournamentId", form.tournamentId);

      if (receipt) formData.append("receipt", receipt);

      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
        body: formData,
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.message || "Registration failed");
      }

      setSuccess("Team registered & payment submitted successfully!");

      setForm({
        teamName: "",
        coachName: "",
        coachEmail: "",
        transactionNumber: "",
        amount: 500,
        tournamentId: "",
      });

      setReceipt(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HEADER (ADMIN STYLE) */}
      <section className="relative overflow-hidden py-8 sm:py-10">
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center text-black">
          <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
            Team Registration
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm text-gray-600">
            Register your team and submit payment details
          </p>
        </div>
      </section>

      {/* FORM WRAPPER */}
      <section className="mx-auto max-w-4xl px-4 pb-10">
        {/* ERROR */}
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-center text-sm text-red-700">
            {error}
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-center text-sm text-green-700">
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-xl bg-white shadow-md"
        >
          <div className="grid gap-4 p-4 sm:p-6">
            {/* TEAM NAME */}
            <input
              name="teamName"
              placeholder="Team Name"
              value={form.teamName}
              onChange={handleChange}
              className="w-full rounded-lg border bg-gray-50 p-3 text-sm outline-none focus:border-red-900"
              required
            />

            {/* COACH NAME */}
            <input
              name="coachName"
              placeholder="Coach Name"
              value={form.coachName}
              onChange={handleChange}
              className="w-full rounded-lg border bg-gray-50 p-3 text-sm outline-none focus:border-red-900"
              required
            />

            {/* EMAIL */}
            <input
              name="coachEmail"
              type="email"
              placeholder="Coach Email"
              value={form.coachEmail}
              onChange={handleChange}
              className="w-full rounded-lg border bg-gray-50 p-3 text-sm outline-none focus:border-red-900"
              required
            />

            {/* TOURNAMENT */}
            <select
              name="tournamentId"
              value={form.tournamentId}
              onChange={handleChange}
              className="w-full rounded-lg border bg-gray-50 p-3 text-sm outline-none focus:border-red-900"
              required
            >
              <option value="">Select Tournament</option>
              {tournaments.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>

            {/* TRANSACTION */}
            <input
              name="transactionNumber"
              placeholder="Transaction Number"
              value={form.transactionNumber}
              onChange={handleChange}
              className="w-full rounded-lg border bg-gray-50 p-3 text-sm outline-none focus:border-red-900"
              required
            />

            {/* AMOUNT */}
            <input
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              className="w-full rounded-lg border bg-gray-50 p-3 text-sm outline-none focus:border-red-900"
              required
            />

            {/* FILE */}
            <input
              type="file"
              onChange={(e) => setReceipt(e.target.files?.[0] || null)}
              className="w-full rounded-lg border bg-gray-50 p-3 text-sm"
              required
            />

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-gradient-to-r from-red-950 via-red-900 to-black py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Processing..." : "Register & Pay"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
