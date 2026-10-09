import db from "../../config/drizzle";

import { teams } from "../../db/schema/team";
import { payments } from "../../db/schema/payment";

import { eq, desc } from "drizzle-orm";

import { CreateTeamInput } from "./team.types";

/* =========================
   CREATE TEAM
========================= */

export const createTeamInDB = async (data: CreateTeamInput) => {
  const result = await db
    .insert(teams)
    .values({
      name: data.name,

      coachName: data.coachName,

      contactEmail: data.contactEmail,

      // add team owner
      managerId: data.managerId,
    })
    .returning();

  return result[0];
};

/* =========================
   GET ALL TEAMS
========================= */

export const getAllTeamsFromDB = async () => {
  return await db
    .select({
      id: teams.id,

      name: teams.name,

      coachName: teams.coachName,

      contactEmail: teams.contactEmail,

      // return owner
      managerId: teams.managerId,

      paymentStatus: payments.status,

      createdAt: teams.createdAt,
    })

    .from(teams)

    .leftJoin(payments, eq(teams.id, payments.teamId))

    .orderBy(desc(teams.createdAt));
};

/* =========================
   GET TEAM BY ID
========================= */

export const getTeamByIdFromDB = async (id: string) => {
  const result = await db
    .select({
      id: teams.id,

      name: teams.name,

      coachName: teams.coachName,

      contactEmail: teams.contactEmail,

      managerId: teams.managerId,

      paymentStatus: payments.status,

      createdAt: teams.createdAt,
    })

    .from(teams)

    .leftJoin(payments, eq(teams.id, payments.teamId))

    .where(eq(teams.id, id))

    .limit(1);

  return result[0] ?? null;
};

/* =========================
   GET TEAM BY MANAGER ID
========================= */

export const getTeamByManagerIdFromDB = async (managerId: string) => {
  const result = await db
    .select({
      id: teams.id,

      name: teams.name,

      coachName: teams.coachName,

      contactEmail: teams.contactEmail,

      managerId: teams.managerId,

      createdAt: teams.createdAt,
    })

    .from(teams)

    .where(eq(teams.managerId, managerId))

    .limit(1);

  return result[0] ?? null;
};
