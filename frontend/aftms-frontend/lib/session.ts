import type { User } from "../types/auth.types";

/*
  Cookies must outlive a single day so users stay logged in until they
  explicitly log out. 400 days is the practical ceiling browsers (Chrome)
  will honor for a Set-Cookie max-age; anything longer gets clamped anyway.
*/
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 400;

export const dashboardPathForRole = (role: string): string | null => {
  if (role === "TEAM_MANAGER") return "/team-manager/dashboard";
  if (role === "ADMIN" || role === "SUPER_ADMIN" || role === "TOURNAMENT_ADMIN") {
    return "/admin/dashboard";
  }
  return null;
};

/**
 * Persist an authenticated session (cookies for the proxy/middleware,
 * localStorage for client-side reads) so the user stays logged in across
 * reloads/browser restarts until they explicitly log out.
 */
export const persistSession = (token: string, user: User) => {
  document.cookie = `token=${token}; path=/; max-age=${SESSION_MAX_AGE_SECONDS}; SameSite=Lax`;
  document.cookie = `role=${user.role}; path=/; max-age=${SESSION_MAX_AGE_SECONDS}; SameSite=Lax`;

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

/** Fully end the session. This is the only place a session should be cleared. */
export const clearSession = () => {
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
  document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";

  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
