"use client";
import { useEffect, useState } from "react";
interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
}

const API_BASE = "http://localhost:5000/api";

export default function AdminsPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchAdmins = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please login again.");

        const res = await fetch(`${API_BASE}/auth/admins`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();

        if (!res.ok) throw new Error(json?.message || "Failed to fetch admins");

        if (isMounted) setAdmins(json?.data ?? []);
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Something went wrong");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAdmins();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login again.");

      const res = await fetch(`${API_BASE}/auth/admins/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();

      if (!res.ok) throw new Error(json?.message || "Failed to delete admin");

      setAdmins((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <section className="relative overflow-hidden py-8 sm:py-10">
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center text-black">
          <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
            Admin Management
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-xs text-black sm:text-sm">
            Manage system administrators efficiently and securely
          </p>
          <div className=" flex justify-start">
            <a
              href="/admin/admins/create"
              className="mt-6 inline-block bg-gradient-to-r from-red-950 via-red-900 to-black text-white text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow hover:bg-gray-200 transition "
            >
              + Create Admin
            </a>
          </div>
        </div>
      </section>

      {/* ERROR */}
      {error && (
        <div className="mx-auto max-w-4xl px-4 mt-6">
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-center text-sm text-red-700">
            {error}
          </div>
        </div>
      )}

      {/* LOADING */}
      {loading ? (
        <div className="mx-auto max-w-4xl px-4 mt-6">
          <div className="rounded-lg bg-white p-5 sm:p-6 text-center text-gray-600 shadow-sm">
            Loading admins...
          </div>
        </div>
      ) : (
        <section className="mx-auto max-w-4xl px-4 sm:px-4 py-6 sm:py-10">
          <div className="overflow-hidden rounded-xl bg-white shadow-md">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-[11px] sm:text-sm md:text-base">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left whitespace-nowrap">
                      Name
                    </th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left whitespace-nowrap">
                      Email
                    </th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left whitespace-nowrap">
                      Role
                    </th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {admins.map((admin) => (
                    <tr key={admin.id} className="hover:bg-gray-50 transition">
                      <td className="px-2 sm:px-4 py-2 sm:py-3 font-medium text-gray-800 whitespace-nowrap">
                        {admin.name}
                      </td>

                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-600 whitespace-nowrap">
                        {admin.email}
                      </td>

                      <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-[10px] sm:text-xs rounded-full bg-gray-100 text-gray-700">
                          {admin.role}
                        </span>
                      </td>

                      <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <button
                          onClick={() => handleDelete(admin.id)}
                          className="text-red-600 hover:text-red-800 text-[10px] sm:text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
