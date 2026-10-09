import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import { OAuth2Client } from "google-auth-library";
import { env } from "../../config/env";
import {
  findUserByEmail,
  createUser,
  findAdmins,
  findAdminById,
  updateAdmin,
  deleteAdmin,
} from "./auth.repository";

const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

const signToken = (user: { id: string; role: string }) =>
  jwt.sign({ userId: user.id, role: user.role }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });

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

  const token = signToken(user);

  return { user, token };
};

/* ================= GOOGLE LOGIN ================= */
export const googleLoginService = async (idToken: string) => {
  if (!env.GOOGLE_CLIENT_ID) {
    throw new Error("Google sign-in is not configured on the server.");
  }

  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  if (!payload?.email) {
    throw new Error("Invalid Google token.");
  }

  const existingUser = await findUserByEmail(payload.email);

  // Accounts created via Google don't have a password the user knows;
  // store a random hash since the column is required, and the user
  // will always authenticate via Google going forward.
  const user =
    existingUser ??
    (await createUser({
      name: payload.name || payload.email,
      email: payload.email,
      password: await bcrypt.hash(randomUUID(), 10),
      role: "TEAM_MANAGER",
    }));

  const token = signToken(user);

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
