export type UserRole = "SUPER_ADMIN" | "TOURNAMENT_ADMIN" | "TEAM_MANAGER";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface AuthResponse {
  user: User;
  token: string;
}
