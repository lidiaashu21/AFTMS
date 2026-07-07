"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface User {
  fullName: string;
  role: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white p-5 space-y-6">
        <h1 className="text-2xl font-bold">AFTMS</h1>

        <nav className="space-y-3 text-sm">
          <Link href="/" className="block hover:text-green-400">
            Home
          </Link>

          {user?.role === "SUPER_ADMIN" && (
            <>
              <Link href="/super-admin/dashboard">Dashboard</Link>
              <Link href="/super-admin/tournaments">Tournaments</Link>
              <Link href="/super-admin/admins">Admins</Link>
              <Link href="/super-admin/reports">Reports</Link>
            </>
          )}

          {user?.role === "TOURNAMENT_ADMIN" && (
            <>
              <Link href="/tournament-admin/dashboard">Dashboard</Link>
              <Link href="/tournament-admin/teams">Teams</Link>
              <Link href="/tournament-admin/payments">Payments</Link>
              <Link href="/tournament-admin/fixtures">Fixtures</Link>
              <Link href="/tournament-admin/announcements">Announcements</Link>
            </>
          )}

          {user?.role === "TEAM_MANAGER" && (
            <>
              <Link href="/team-manager/dashboard">Dashboard</Link>
              <Link href="/team-manager/register-team">Register Team</Link>
              <Link href="/team-manager/payments">Payments</Link>
              <Link href="/team-manager/fixtures">Fixtures</Link>
            </>
          )}
        </nav>

        <button
          onClick={logout}
          className="mt-10 w-full rounded-lg bg-red-600 py-2 text-sm"
        >
          Logout
        </button>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
