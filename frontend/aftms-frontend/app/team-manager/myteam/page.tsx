"use client";

import { useEffect, useState } from "react";
import { Users, User, Mail } from "lucide-react";

interface TeamData {
  id: string;
  name: string;
  coachName: string;
  contactEmail: string;
}

export default function MyTeamPage() {
  const [team, setTeam] = useState<TeamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found. Please login again.");
        }

        const res = await fetch("http://localhost:5000/api/teams", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const json = await res.json();

        if (!res.ok) {
          throw new Error(json?.message || "Failed to fetch team");
        }

        const teamData = json?.data?.[0] || null;
        setTeam(teamData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HEADER (ADMIN STYLE) */}
      <section className="relative overflow-hidden py-8 sm:py-10">
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center text-black">
          <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">My Team</h1>

          <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm text-gray-600">
            View your team details and information
          </p>
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
          <div className="rounded-lg bg-white p-6 text-center shadow-sm">
            Loading team...
          </div>
        </div>
      ) : (
        <section className="mx-auto max-w-4xl px-4 py-6 sm:py-10">
          {team ? (
            <div className="overflow-hidden rounded-xl bg-white shadow-md">
              {/* TABLE STYLE HEADER CARD */}
              <div className="bg-gray-100 px-4 py-4 sm:px-6 flex items-center gap-3">
                <Users className="h-5 w-5 text-gray-700" />
                <h2 className="text-sm sm:text-base font-semibold text-gray-800">
                  Team Information
                </h2>
              </div>

              {/* CONTENT */}
              <div className="divide-y divide-gray-100">
                {/* TEAM NAME */}
                <div className="flex justify-between px-4 py-3 sm:px-6">
                  <span className="text-gray-500 text-xs sm:text-sm">
                    Team Name
                  </span>
                  <span className="text-gray-900 font-medium text-xs sm:text-sm">
                    {team.name}
                  </span>
                </div>

                {/* COACH */}
                <div className="flex justify-between px-4 py-3 sm:px-6">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-500 text-xs sm:text-sm">
                      Coach Name
                    </span>
                  </div>
                  <span className="text-gray-900 font-medium text-xs sm:text-sm">
                    {team.coachName}
                  </span>
                </div>

                {/* EMAIL */}
                <div className="flex justify-between px-4 py-3 sm:px-6">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-500 text-xs sm:text-sm">
                      Contact Email
                    </span>
                  </div>
                  <span className="text-gray-900 font-medium text-xs sm:text-sm break-all">
                    {team.contactEmail}
                  </span>
                </div>

                {/* TEAM ID */}
                <div className="flex justify-between px-4 py-3 sm:px-6">
                  <span className="text-gray-500 text-xs sm:text-sm">
                    Team ID
                  </span>
                  <span className="text-gray-700 text-xs break-all">
                    {team.id}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl bg-white p-10 text-center shadow-sm text-gray-500">
              No team found
            </div>
          )}
        </section>
      )}
    </main>
  );
}
