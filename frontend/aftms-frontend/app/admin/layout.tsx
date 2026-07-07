"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  LayoutDashboard,
  Trophy,
  Users,
  CreditCard,
  ClipboardList,
  Megaphone,
  Shield,
  Menu,
  X,
} from "lucide-react";

const menu = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Admin", href: "/admin/admins", icon: Shield },
  { name: "Tournaments", href: "/admin/tournaments", icon: Trophy },

  { name: "Payments", href: "/admin/payment", icon: CreditCard },
  { name: "Report", href: "/admin/reports", icon: CreditCard },
  { name: "Matches", href: "/admin/match", icon: ClipboardList },
  { name: "Fixtures", href: "/admin/fixture", icon: ClipboardList },
  { name: "Announcements", href: "/admin/announcement", icon: Megaphone },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex max-h-screen bg-white text-black">
      {/* ================= BACKDROP ================= */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 md:hidden z-40"
        />
      )}

      {/* ================= SIDEBAR (TEAM MANAGER STYLE) ================= */}
      <aside
        className={`
          fixed md:static z-50  w-54
          bg-gradient-to-r from-red-950 via-red-900 to-black
          text-white shadow-2xl
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* LOGO */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/20">
          <h1 className="text-xl font-bold tracking-wide">⚽ AFTMS Admin</h1>

          <button
            className="md:hidden p-2 rounded hover:bg-white/10"
            onClick={() => setOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* MENU */}
        <nav className="p-3 space-y-1">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition
                  ${
                    active
                      ? "bg-white text-black"
                      : "text-white hover:bg-white/10"
                  }`}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ================= MAIN AREA ================= */}
      <div className="flex-1 flex flex-col max-h-screen">
        {/* ================= TOP BAR ================= */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 md:px-8 bg-gradient-to-r from-red-950 via-red-900 to-black text-white shadow">
          {/* MOBILE MENU */}
          <button className="md:hidden" onClick={() => setOpen(true)}>
            <Menu size={24} />
          </button>

          {/* TITLE */}
          <h2 className="font-bold text-lg sm:text-xl md:text-2xl">
            Admin Panel
          </h2>
        </header>

        {/* ================= CONTENT ================= */}
        <main className="flex-1 bg-white overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
