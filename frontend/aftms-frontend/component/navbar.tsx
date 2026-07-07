"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/image/logo.png";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Tournaments", href: "/tournaments" },
    { name: "Fixtures", href: "/fixtures" },
    { name: "Results", href: "/results" },
    { name: "Announcements", href: "/announcements" },
  ];

  return (
    <header className="sticky top-0 z-50 shadow-md">
      <div className="bg-gradient-to-r from-red-950 via-red-900 to-black">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo}
              alt="AFTMS Logo"
              width={46}
              height={46}
              priority
              className="object-contain"
            />

            <div>
              <h1 className="text-base font-bold text-white">AFTMS</h1>
              <p className="hidden text-[10px] text-gray-300 sm:block">
                Football Tournament System
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white transition duration-200 hover:text-red-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={() => setOpen(!open)} className="lg:hidden">
            {open ? (
              <X size={24} className="text-white" />
            ) : (
              <Menu size={24} className="text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="border-t border-red-900 bg-gradient-to-r from-red-950 via-red-900 to-blacklg:hidden">
            <div className="space-y-1 px-4 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm text-white transition hover:bg-red-950"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
