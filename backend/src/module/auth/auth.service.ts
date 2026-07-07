import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import {
  findUserByEmail,
  createUser,
  findAdmins,
  findAdminById,
  updateAdmin,
  deleteAdmin,
} from "./auth.repository";

/* ================= REGISTER ================= */
export const registerService = async (data: any) => {
  const existing = await findUserByEmail(data.email);
  if (existing) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(data.password, 10);

  return createUser({
    ...data,
    password: hashedPassword,
    role: "TEAM_MANAGER",
  });
};

/* ================= CREATE ADMIN ================= */
export const createAdminService = async (data: any) => {
  const existing = await findUserByEmail(data.email);
  if (existing) throw new Error("Admin already exists");

  const hashedPassword = await bcrypt.hash(data.password, 10);

  return createUser({
    ...data,
    password: hashedPassword,
    role: "ADMIN",
  });
};

/* ================= LOGIN ================= */
export const loginService = async (data: any) => {
  const user = await findUserByEmail(data.email);
  if (!user) throw new Error("User not found");

  const isValid = await bcrypt.compare(data.password, user.password);
  if (!isValid) throw new Error("Invalid credentials");

  const token = jwt.sign({ userId: user.id, role: user.role }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });

  return { user, token };
};

/* ================= ADMIN CRUD ================= */
export const getAllAdminsService = async () => {
  return findAdmins();
};

export const getAdminByIdService = async (id: string) => {
  const admin = await findAdminById(id);
  if (!admin) throw new Error("Admin not found");
  return admin;
};

export const updateAdminService = async (id: string, data: any) => {
  return updateAdmin(id, data);
};

export const deleteAdminService = async (id: string) => {
  return deleteAdmin(id);
};
