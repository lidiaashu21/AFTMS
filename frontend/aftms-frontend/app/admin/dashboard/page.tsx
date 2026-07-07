"use client";

import Image from "next/image";
import bg from "../../../public/image/c2.png";

export default function DashboardPage() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
      {/* BACKGROUND */}
      <Image
        src={bg}
        alt="background"
        fill
        priority
        className="object-cover object-center"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/20" />

      {/* CONTENT WRAPPER (CENTERED PROPERLY) */}
      <div className="relative z-10 w-full max-w-5xl px-4 sm:px-6 md:px-10 text-center">
        {/* TITLE */}
        <h1
          className="
          text-white font-bold tracking-wide
          text-3xl sm:text-4xl md:text-5xl lg:text-6xl
          leading-tight
        "
        >
          Admin Welcome
        </h1>

        {/* SUBTITLE */}
        <p
          className="
          mt-4 sm:mt-5 text-gray-200
          text-sm sm:text-base md:text-lg lg:text-xl
          leading-relaxed
          max-w-xl mx-auto
        "
        >
          Full control. Every team. Every win
        </p>
      </div>
    </div>
  );
}
