export interface User {
  id: string;
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "TOURNAMENT_ADMIN" | "TEAM_MANAGER";
}

const TOKEN_KEY = "token";
const USER_KEY = "user";

/**
 * Get token from localStorage
 */
export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Save auth data after login
 */
export const setAuth = (token: string, user: User) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

/**
 * Get current user
 */
export const getUser = (): User | null => {
  if (typeof window === "undefined") return null;

  const data = localStorage.getItem(USER_KEY);
  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

/**
 * Logout user
 */
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  window.location.href = "/";
};

/**
 * Role helpers
 */
export const isSuperAdmin = () => getUser()?.role === "SUPER_ADMIN";
export const isTournamentAdmin = () => getUser()?.role === "TOURNAMENT_ADMIN";
export const isTeamManager = () => getUser()?.role === "TEAM_MANAGER";
