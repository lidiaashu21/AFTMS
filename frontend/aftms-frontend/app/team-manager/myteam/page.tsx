"use client";

import { useEffect, useState } from "react";

import {
  Users,
  User,
  Mail,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

type PaymentStatus = "PENDING" | "APPROVED" | "REJECTED";

interface TeamData {
  id: string;
  name: string;
  coachName: string;
  contactEmail: string;
}

interface PaymentData {
  status: PaymentStatus;
  amount: number;
}

export default function MyTeamPage() {
  const [team, setTeam] = useState<TeamData | null>(null);

  const [payment, setPayment] = useState<PaymentData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found. Please login again.");
        }

        // ===========================
        // GET TEAM
        // ===========================

        const teamRes = await fetch(
          "http://localhost:5000/api/teams",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const teamJson = await teamRes.json();

        if (!teamRes.ok) {
          throw new Error(teamJson.message || "Failed to fetch team");
        }

        const currentTeam = teamJson?.data?.[0] || null;

        setTeam(currentTeam);

        // ===========================
        // GET PAYMENT
        // ===========================

        const paymentRes = await fetch(
          "http://localhost:5000/api/payments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const paymentJson = await paymentRes.json();

        if (!paymentRes.ok) {
          throw new Error(paymentJson.message || "Failed to fetch payment");
        }

        const teamPayment = paymentJson?.data?.find(
          (payment: any) => payment.teamId === currentTeam?.id,
        );

        setPayment(teamPayment || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const paymentStyle = (status: PaymentStatus) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const getRegistrationMessage = () => {
    if (!payment) return null;

    switch (payment.status) {
      case "APPROVED":
        return {
          icon: <CheckCircle className="text-green-600" size={28} />,

          title: "Registration Approved",

          message:
            "Congratulations! Your registration has been approved successfully. Your team is now eligible to participate in the tournament.",

          style: "bg-green-50 border-green-200 text-green-700",
        };

      case "REJECTED":
        return {
          icon: <XCircle className="text-red-600" size={28} />,

          title: "Registration Rejected",

          message:
            "Your registration has been rejected. Please try again later or contact support for more information.",

          style: "bg-red-50 border-red-200 text-red-700",
        };

      default:
        return {
          icon: <Clock className="text-yellow-600" size={28} />,

          title: "Registration Under Review",

          message:
            "Your registration is currently being reviewed. Please wait until the admin completes the approval process.",

          style: "bg-yellow-50 border-yellow-200 text-yellow-700",
        };
    }
  };

  const registration = getRegistrationMessage();

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="py-8 text-center">
        <h1 className="text-2xl font-bold">My Team</h1>

        <p className="text-gray-600 text-sm mt-2">
          View team information and payment status
        </p>
      </section>

      {error && (
        <div className="mx-auto max-w-4xl px-4">
          <div
            className="
            bg-red-50
            border
            border-red-200
            text-red-700
            p-3
            rounded-lg
          "
          >
            {error}
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <section className="mx-auto max-w-4xl px-4">
          {/* REGISTRATION MESSAGE */}

          {registration && (
            <div
              className={`
                mb-6
                border
                rounded-xl
                p-5
                flex
                gap-4
                items-start
                ${registration.style}
              `}
            >
              {registration.icon}

              <div>
                <h3 className="font-bold text-lg">{registration.title}</h3>

                <p className="text-sm mt-1">{registration.message}</p>
              </div>
            </div>
          )}

          {/* TEAM INFORMATION */}

          {team && (
            <div
              className="
              bg-white
              rounded-xl
              shadow-md
              overflow-hidden
            "
            >
              <div
                className="
                bg-gray-100
                p-4
                flex
                gap-3
                items-center
              "
              >
                <Users />

                <h2 className="font-semibold">Team Information</h2>
              </div>

              <div className="divide-y">
                <div className="p-4 flex justify-between">
                  <span>Team Name</span>

                  <strong>{team.name}</strong>
                </div>

                <div className="p-4 flex justify-between">
                  <span className="flex gap-2">
                    <User size={18} />
                    Coach
                  </span>

                  <strong>{team.coachName}</strong>
                </div>

                <div className="p-4 flex justify-between">
                  <span className="flex gap-2">
                    <Mail size={18} />
                    Email
                  </span>

                  <strong>{team.contactEmail}</strong>
                </div>
              </div>
            </div>
          )}

          {/* PAYMENT STATUS */}

          <div
            className="
            mt-6
            bg-white
            rounded-xl
            shadow-md
            overflow-hidden
          "
          >
            <div
              className="
              bg-gray-100
              p-4
              flex
              gap-3
              items-center
            "
            >
              <CreditCard />

              <h2 className="font-semibold">Payment Status</h2>
            </div>

            {payment ? (
              <div className="p-5 space-y-4">
                <div className="flex justify-between">
                  <span>Status</span>

                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      font-medium
                      ${paymentStyle(payment.status)}
                    `}
                  >
                    {payment.status}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Amount</span>

                  <strong>${payment.amount}</strong>
                </div>
              </div>
            ) : (
              <div
                className="
                p-6
                text-center
                text-gray-500
              "
              >
                No payment submitted yet
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
