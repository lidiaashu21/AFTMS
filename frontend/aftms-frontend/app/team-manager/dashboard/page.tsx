"use client";

import Image from "next/image";
import bg from "../../../public/image/l3.png";

export default function DashboardPage() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background */}
      <Image src={bg} alt="background" fill priority className="object-cover" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
          {/* TITLE */}
          <h1
            className="
              text-white font-extrabold tracking-wide
              text-2xl sm:text-3xl md:text-5xl lg:text-5xl xl:text-6xl
              leading-tight
            "
          >
            Team Manager Welcome
          </h1>

          {/* DESCRIPTION */}
          <p
            className="
              mt-4 text-gray-200
              text-sm sm:text-base md:text-lg lg:text-xl
              leading-relaxed
              px-2 sm:px-0
            "
          >
            Command your team. Drive performance. Win every match
          </p>
        </div>
      </div>
    </div>
  );
}
