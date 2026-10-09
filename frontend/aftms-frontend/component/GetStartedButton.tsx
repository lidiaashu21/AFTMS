"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function GetStartedButton() {
  const router = useRouter();

  const [dashboard, setDashboard] = useState<string>("/welcome");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = () => {
      const cookies = document.cookie;

      const token = cookies
        .split("; ")
        .find((item) => item.startsWith("token="))
        ?.split("=")[1];

      const user = localStorage.getItem("user");

      console.log("TOKEN:", token);

      console.log("USER:", user);

      if (token && user) {
        const parsedUser = JSON.parse(user);

        if (parsedUser.role === "ADMIN") {
          setDashboard("/admin/dashboard");
        }

        if (parsedUser.role === "TEAM_MANAGER") {
          setDashboard("/team-manager/dashboard");
        }
      }

      setLoading(false);
    };

    checkSession();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <button
      onClick={() => router.push(dashboard)}
      className="
      px-16
      py-4
      bg-gradient-to-r
      from-red-950
      via-red-900
      to-black
      text-white
      text-lg
      rounded-xl
      font-semibold
      "
    >
      Get Started
    </button>
  );
}
