import db from "../../config/drizzle";
import { tournaments } from "../../db/schema/tournament";

import { eq, desc } from "drizzle-orm";
import {
  CreateTournamentInput,
  UpdateTournamentInput,
} from "./tournament.types";

/* =========================
   CREATE TOURNAMENT
========================= */
export const createTournamentInDB = async (data: CreateTournamentInput) => {
  const result = await db
    .insert(tournaments)
    .values({
      ...data,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    })
    .returning();

  return result[0];
};

/* =========================
   GET ALL TOURNAMENTS
========================= */
export const getAllTournamentsFromDB = async () => {
  return await db
    .select()
    .from(tournaments)
    .orderBy(desc(tournaments.createdAt));
};

/* =========================
   GET TOURNAMENT BY ID
========================= */
export const getTournamentByIdFromDB = async (id: string) => {
  const result = await db
    .select()
    .from(tournaments)
    .where(eq(tournaments.id, id))
    .limit(1);

  return result[0] || null;
};

/* =========================
   UPDATE TOURNAMENT
========================= */
export const updateTournamentInDB = async (
  id: string,
  data: UpdateTournamentInput,
) => {
  const updatedData: any = { ...data };

  if (data.startDate) {
    updatedData.startDate = new Date(data.startDate);
  }

  if (data.endDate) {
    updatedData.endDate = new Date(data.endDate);
  }

  const result = await db
    .update(tournaments)
    .set(updatedData)
    .where(eq(tournaments.id, id))
    .returning();

  return result[0];
};

/* =========================
   DELETE TOURNAMENT
========================= */
export const deleteTournamentFromDB = async (id: string) => {
  const result = await db
    .delete(tournaments)
    .where(eq(tournaments.id, id))
    .returning();

  return result[0];
};
