"use client";

import { useEffect, useState, useRef } from "react";

type PaymentStatus = "PENDING" | "APPROVED" | "REJECTED";

interface Payment {
  id: string;
  teamName: string;
  transactionNumber: string;
  receiptUrl?: string;
  amount: number;
  status: PaymentStatus;
  createdAt?: string;
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const hasFetched = useRef(false);

  // =========================
  // FETCH PAYMENTS
  // =========================
  const fetchPayments = async (token: string) => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("https://aftms.onrender.com/api/payments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || "Failed to fetch payments");
      }

      setPayments(data?.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const run = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found. Please login again.");
        setLoading(false);
        return;
      }

      await fetchPayments(token);
    };

    run();
  }, []);
  const updatePaymentStatus = async (id: string, status: PaymentStatus) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found. Please login again.");
      }

      const res = await fetch(
        `https://aftms.onrender.com/api/payments/${id}/status`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            status,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to update payment");
      }

      /*
      Reload payments from database

      Why?
      Because approval changes database state.
      The fixture system reads from database.
    */

      await fetchPayments(token);
    } catch (error) {
      console.error("UPDATE PAYMENT ERROR:", error);

      alert(error instanceof Error ? error.message : "Something went wrong");
    }
  };
  // =========================
  // STATUS COLORS
  // =========================
  const statusStyle = (status: PaymentStatus) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <section className="relative overflow-hidden py-8 sm:py-10">
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center text-black">
          <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
            Payment Management
          </h1>

          <p className="mx-auto mt-2 max-w-xl text-xs text-gray-800 sm:text-sm">
            Approve or manage team payments efficiently and securely
          </p>
        </div>
      </section>

      {/* ERROR */}
      {error && (
        <div className="mx-auto max-w-5xl px-4 mt-5">
          <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-xs sm:text-sm">
            {error}
          </div>
        </div>
      )}

      {/* LOADING */}
      {loading ? (
        <div className="mx-auto max-w-5xl px-4 mt-5 text-gray-600 text-sm">
          Loading payments...
        </div>
      ) : (
        <section className="mx-auto max-w-5xl px-4 py-6 sm:py-10 space-y-4">
          {payments.length === 0 ? (
            <div className="text-center bg-white rounded-xl shadow-sm py-12 text-gray-500 text-sm sm:text-base">
              No payments found
            </div>
          ) : (
            payments.map((payment) => (
              <div
                key={payment.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                {/* LEFT INFO */}
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">
                      {payment.teamName}
                    </h2>

                    <span
                      className={`text-[10px] sm:text-xs px-2 py-1 rounded-full font-medium ${statusStyle(
                        payment.status,
                      )}`}
                    >
                      {payment.status}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600">
                    Transaction: {payment.transactionNumber}
                  </p>

                  <p className="text-xs sm:text-sm text-gray-600">
                    Amount:{" "}
                    <span className="font-semibold text-gray-800">
                      ${payment.amount}
                    </span>
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2 md:flex-col md:items-end">
                  <button
                    onClick={() => updatePaymentStatus(payment.id, "APPROVED")}
                    className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm transition"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updatePaymentStatus(payment.id, "REJECTED")}
                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      )}
    </main>
  );
}
