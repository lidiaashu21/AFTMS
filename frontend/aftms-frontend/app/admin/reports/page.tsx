"use client";

import { useEffect, useState } from "react";

interface ReportData {
  totalTeams: number;
  totalMatches: number;
  totalPayments: number;
  totalTournaments: number;
  approvedPayments: number;
  pendingPayments: number;
  rejectedPayments: number;
}

export default function ReportsPage() {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          if (isMounted) {
            setError("No token found. Please login again.");
            setLoading(false);
          }
          return;
        }
        const res = await fetch("https://aftms.onrender.com/api/reports", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(result?.message || "Failed to fetch reports");
        }

        if (isMounted) {
          setData(result.data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Something went wrong");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchReports();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-6">
      {/* HEADER */}
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 text-center">
        System Reports
      </h1>

      {/* ERROR */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      {/* LOADING */}
      {loading ? (
        <p className="text-gray-600 text-sm">Loading reports...</p>
      ) : (
        <div className="bg-white border rounded-lg p-5 space-y-6">
          {/* OVERVIEW */}
          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              Overview
            </h2>

            <div className="flex justify-between border-b py-3">
              <span className="text-sm text-gray-600">Total Tournaments</span>
              <span className="text-sm font-semibold text-gray-900">
                {data?.totalTournaments ?? 0}
              </span>
            </div>

            <div className="flex justify-between border-b py-3">
              <span className="text-sm text-gray-600">Total Teams</span>
              <span className="text-sm font-semibold text-gray-900">
                {data?.totalTeams ?? 0}
              </span>
            </div>

            <div className="flex justify-between border-b py-3">
              <span className="text-sm text-gray-600">Total Matches</span>
              <span className="text-sm font-semibold text-gray-900">
                {data?.totalMatches ?? 0}
              </span>
            </div>

            <div className="flex justify-between border-b py-3">
              <span className="text-sm text-gray-600">Total Payments</span>
              <span className="text-sm font-semibold text-gray-900">
                {data?.totalPayments ?? 0}
              </span>
            </div>
          </div>

          {/* PAYMENT BREAKDOWN */}
          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              Payments Breakdown
            </h2>

            <div className="flex justify-between border-b py-3">
              <span className="text-sm text-gray-600">Approved Payments</span>
              <span className="text-sm font-semibold text-green-600">
                {data?.approvedPayments ?? 0}
              </span>
            </div>

            <div className="flex justify-between border-b py-3">
              <span className="text-sm text-gray-600">Pending Payments</span>
              <span className="text-sm font-semibold text-yellow-600">
                {data?.pendingPayments ?? 0}
              </span>
            </div>

            <div className="flex justify-between border-b py-3">
              <span className="text-sm text-gray-600">Rejected Payments</span>
              <span className="text-sm font-semibold text-red-600">
                {data?.rejectedPayments ?? 0}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
