"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Trophy,
  Megaphone,
  ClipboardList,
} from "lucide-react";

interface User {
  role: string;
}

export default function Sidebar() {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <>
      {/* MOBILE TOGGLE */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed left-4 top-4 z-50 rounded bg-green-700 p-2 text-white md:hidden"
      >
        ☰
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-64 bg-slate-900 text-white transition-transform md:static md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="p-5 text-xl font-bold border-b border-slate-700">
          ⚽ AFTMS
        </div>

        {/* MENU */}
        <nav className="flex flex-col gap-2 p-4 text-sm">
          <Link href="/" className="flex items-center gap-2 py-2">
            <LayoutDashboard size={16} /> Home
          </Link>

          {/* SUPER ADMIN */}
          {user?.role === "SUPER_ADMIN" && (
            <>
              <Link href="/super-admin/dashboard">Dashboard</Link>
              <Link href="/super-admin/tournaments">Tournaments</Link>
              <Link href="/super-admin/admins">Admins</Link>
              <Link href="/super-admin/reports">Reports</Link>
            </>
          )}

          {/* TOURNAMENT ADMIN */}
          {user?.role === "TOURNAMENT_ADMIN" && (
            <>
              <Link href="/tournament-admin/dashboard">Dashboard</Link>

              <Link href="/tournament-admin/teams">
                <Users size={16} /> Teams
              </Link>

              <Link href="/tournament-admin/payments">
                <CreditCard size={16} /> Payments
              </Link>

              <Link href="/tournament-admin/fixtures">
                <Trophy size={16} /> Fixtures
              </Link>

              <Link href="/tournament-admin/announcements">
                <Megaphone size={16} /> Announcements
              </Link>
            </>
          )}

          {/* TEAM MANAGER */}
          {user?.role === "TEAM_MANAGER" && (
            <>
              <Link href="/team-manager/dashboard">Dashboard</Link>

              <Link href="/team-manager/register-team">Register Team</Link>

              <Link href="/team-manager/payments">Payments</Link>

              <Link href="/team-manager/fixtures">Fixtures</Link>
            </>
          )}
        </nav>
      </aside>
    </>
  );
}
