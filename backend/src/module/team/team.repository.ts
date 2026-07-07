import db from "../../config/drizzle";
import { teams } from "../../db/schema/team";

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
    })
    .returning({
      id: teams.id,
      name: teams.name,
      coachName: teams.coachName,
      contactEmail: teams.contactEmail,
      createdAt: teams.createdAt,
    });

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
      createdAt: teams.createdAt,
    })
    .from(teams)
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
      createdAt: teams.createdAt,
    })
    .from(teams)
    .where(eq(teams.id, id))
    .limit(1);

  return result[0] || null;
};
