"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function CreateAdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/auth/create-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create admin");
      }

      setSuccess("Admin created successfully");

      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        router.push("/admin/admins");
      }, 1000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HEADER (SAME STYLE AS ABOUT PAGE) */}
      <section className="relative overflow-hidden py-10 sm:py-12">
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center text-black">
          <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
            Create New Admin
          </h1>

          <p className="mx-auto mt-2 max-w-xl text-xs text-gray-800 sm:text-sm">
            Add a new administrator to manage the system securely
          </p>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="mx-auto max-w-4xl px-4 py-8 sm:py-10">
        <div className="mx-auto w-full max-w-xl rounded-2xl bg-white shadow-md p-5 sm:p-6 md:p-8">
          {/* ERROR */}
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-xs sm:text-sm text-red-700">
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="mb-4 rounded-lg bg-green-50 border border-green-200 p-3 text-xs sm:text-sm text-green-700">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-900"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-900"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-900"
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-900"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-gradient-to-r from-red-950 via-red-900 to-black text-white py-2.5 sm:py-3 text-xs sm:text-sm font-medium hover:bg-gray-800 transition disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Admin"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
