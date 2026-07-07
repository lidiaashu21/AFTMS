"use client";

import Link from "next/link";
import Image from "next/image";

import logo from "../public/image/logo.png";

export default function Footer() {
  return (
    <footer className="bg-black text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={logo}
                alt="AFTMS Logo"
                width={50}
                height={50}
                className="rounded-full bg-white p-1"
                priority
              />

              <div>
                <h2 className="text-xl font-bold text-white">AFTMS</h2>

                <p className="text-xs text-slate-400">
                  Football Tournament System
                </p>
              </div>
            </Link>

            <p className="mt-4 max-w-2xs text-sm text-slate-400">
              Addis Football Tournament Management System helps organize, manage
              and monitor football tournaments efficiently.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>

            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/" className="transition hover:text-red-400">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/about" className="transition hover:text-red-400">
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/tournaments"
                  className="transition hover:text-red-400"
                >
                  Tournaments
                </Link>
              </li>

              <li>
                <Link
                  href="/fixtures"
                  className="transition hover:text-red-400"
                >
                  Fixtures
                </Link>
              </li>

              <li>
                <Link href="/results" className="transition hover:text-red-400">
                  Results
                </Link>
              </li>

              <li>
                <Link
                  href="/announcements"
                  className="transition hover:text-red-400"
                >
                  Announcements
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white">Contact</h3>

            <div className="mt-4 space-y-2 text-sm text-slate-400">
              <p>Addis Ababa, Ethiopia</p>
              <p>support@aftms.com</p>
              <p>+251 XXX XXX XXX</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} AFTMS. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
