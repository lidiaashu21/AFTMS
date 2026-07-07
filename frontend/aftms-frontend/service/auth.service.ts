import api from "./api";
import type {
  LoginInput,
  RegisterInput,
  AuthResponse,
} from "../types/auth.types";

export const login = async (data: LoginInput): Promise<AuthResponse> => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const register = async (data: RegisterInput): Promise<AuthResponse> => {
  const res = await api.post("/auth/register", data);
  return res.data;
};
