import db from "../../config/drizzle";
import { users } from "../../db/schema/user";
import { eq, desc, and } from "drizzle-orm";
import { RegisterInput } from "./auth.types";

/* ================= USER BY EMAIL ================= */
export const findUserByEmail = async (email: string) => {
  const result = await db.select().from(users).where(eq(users.email, email));

  return result[0] || null;
};

/* ================= CREATE USER ================= */
export const createUser = async (
  data: RegisterInput & { password: string },
) => {
  const result = await db
    .insert(users)
    .values({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    })
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      createdAt: users.createdAt,
    });

  return result[0];
};

/* ================= FIND USER BY ID ================= */
export const findUserById = async (id: string) => {
  const result = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, id));

  return result[0] || null;
};

/* ================= ADMIN MANAGEMENT ================= */

/* GET ALL ADMINS */
export const findAdmins = async () => {
  return await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.role, "ADMIN"))
    .orderBy(desc(users.createdAt));
};

/* GET ADMIN BY ID */
export const findAdminById = async (id: string) => {
  const result = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(and(eq(users.id, id), eq(users.role, "ADMIN")));

  return result[0] || null;
};

/* UPDATE ADMIN */
export const updateAdmin = async (id: string, data: any) => {
  const result = await db
    .update(users)
    .set(data)
    .where(eq(users.id, id))
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      createdAt: users.createdAt,
    });

  return result[0];
};

/* DELETE ADMIN */
export const deleteAdmin = async (id: string) => {
  const result = await db.delete(users).where(eq(users.id, id)).returning({
    id: users.id,
    name: users.name,
    email: users.email,
    role: users.role,
    createdAt: users.createdAt,
  });

  return result[0] || null;
};
