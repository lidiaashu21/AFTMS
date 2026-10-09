"use client";

import { useEffect, useState } from "react";

interface Announcement {
  id: string;
  title: string;
  message: string;
  createdAt: string;
}

interface AnnouncementForm {
  title: string;
  message: string;
}

const API_BASE = "https://aftms.onrender.com";

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState<AnnouncementForm>({
    title: "",
    message: "",
  });

  useEffect(() => {
    let isMounted = true;

    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please login again.");

        const res = await fetch(`${API_BASE}/api/announcements`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const json = await res.json();

        if (!res.ok)
          throw new Error(json?.message || "Failed to fetch announcements");

        if (isMounted) setAnnouncements(json?.data ?? []);
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Something went wrong");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAnnouncements();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await fetch(`${API_BASE}/api/announcements`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (!res.ok)
        throw new Error(json?.message || "Failed to create announcement");

      setAnnouncements((prev) => [json.data, ...prev]);
      setForm({ title: "", message: "" });
      setShowModal(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Create failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this announcement?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await fetch(`${API_BASE}/api/announcements/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();

      if (!res.ok)
        throw new Error(json?.message || "Failed to delete announcement");

      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <section className="relative py-8 sm:py-10 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center text-black">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Announcements
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-gray-800">
            Publish and manage tournament announcements
          </p>
          <div className=" flex justify-start">
            <button
              onClick={() => setShowModal(true)}
              className="mt-5 bg-gradient-to-r from-red-950 via-red-900 to-black text-white text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow hover:bg-gray-200 transition"
            >
              + New Announcement
            </button>
          </div>
        </div>
      </section>

      {/* ERROR */}
      {error && (
        <div className="mx-auto max-w-5xl px-4 mt-6">
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 text-center">
            {error}
          </div>
        </div>
      )}

      {/* LOADING */}
      {loading ? (
        <div className="mx-auto max-w-5xl px-4 mt-6 text-sm text-gray-600">
          Loading announcements...
        </div>
      ) : (
        <section className="mx-auto max-w-5xl px-4 py-4">
          {/* ================= MOBILE CARDS ================= */}
          <div className="space-y-4 sm:hidden">
            {announcements.length === 0 ? (
              <p className="text-center text-gray-500">
                No announcements found
              </p>
            ) : (
              announcements.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow p-4 border"
                >
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>

                  <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                    {item.message}
                  </p>

                  <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* ================= DESKTOP TABLE ================= */}
          <div className="hidden sm:block bg-white rounded-2xl shadow border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Message</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {announcements.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-10 text-center text-gray-500">
                      No announcements found
                    </td>
                  </tr>
                ) : (
                  announcements.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{item.title}</td>

                      <td className="px-4 py-3 text-gray-600">
                        {item.message}
                      </td>

                      <td className="px-4 py-3 text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-5">
            <h2 className="text-lg font-bold mb-4">Create Announcement</h2>

            <form onSubmit={handleCreate} className="space-y-4">
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
                placeholder="Title"
              />

              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
                rows={4}
                placeholder="Message"
              />

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-full bg-gray-200 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full bg-black text-white px-4 py-2 rounded-lg"
                >
                  Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
