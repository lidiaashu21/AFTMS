"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LogoutButton from "../../component/Logout";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  ClipboardList,
  Trophy,
  Menu,
  X,
  LogOut,
} from "lucide-react";

const menu = [
  { name: "Dashboard", href: "/team-manager/dashboard", icon: LayoutDashboard },
  { name: "My Team", href: "/team-manager/myteam", icon: Users },
  { name: "Fixtures", href: "/team-manager/fixtures", icon: CalendarDays },
  { name: "Results", href: "/team-manager/result", icon: Trophy },
  { name: "Register", href: "/team-manager/register", icon: ClipboardList },
];

export default function TeamManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* ================= OVERLAY ================= */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed md:static top-0 left-0
          h-full w-54
          bg-gradient-to-r from-red-950 via-red-900 to-black
          text-white shadow-2xl z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* LOGO */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/20">
          <h1 className="font-bold text-lg md:text-xl">⚽ Team Panel</h1>

          <button className="md:hidden" onClick={() => setOpen(false)}>
            <X />
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
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg
                  transition font-medium text-sm
                  ${
                    active
                      ? "bg-white text-black"
                      : "hover:bg-white/10 text-white"
                  }
                `}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}

          <LogoutButton />
        </nav>
      </aside>

      {/* ================= MAIN AREA ================= */}
      <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
        {/* ================= HEADER ================= */}
        <header
          className="
            h-16
            w-full
            flex
            items-center
            justify-between
            px-4
            sm:px-6
            md:px-8
            bg-gradient-to-r
            from-red-950
            via-red-900
            to-black
            text-white
            shadow
          "
        >
          {/* MOBILE MENU */}
          <button className="md:hidden" onClick={() => setOpen(true)}>
            <Menu size={24} />
          </button>

          {/* TITLE */}
          <h2 className="font-bold text-lg sm:text-xl md:text-2xl">
            Team Manager Panel
          </h2>

          {/* PROFILE */}
        </header>

        {/* ================= PAGE CONTENT ================= */}
        <main className="flex-1 overflow-y-auto bg-white text-black ">
          {children}
        </main>
      </div>
    </div>
  );
}
