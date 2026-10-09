"use client";

import { useRouter } from "next/navigation";
import { clearSession } from "../lib/session";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // End the session fully (cookies + localStorage) so the user is
    // required to log in again only after this explicit action.
    clearSession();

    // Clear Next.js router cache
    router.refresh();

    // Go to welcome page and remove dashboard history
    router.replace("/welcome");
  };

  return (
    <button
      onClick={handleLogout}
      className="
        rounded-lg
        bg-red-700
        px-5
        py-2
        text-white
        hover:bg-red-800
      "
    >
      Logout
    </button>
  );
}
