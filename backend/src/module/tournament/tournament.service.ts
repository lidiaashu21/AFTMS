import {
  createTournamentInDB,
  getAllTournamentsFromDB,
  getTournamentByIdFromDB,
  updateTournamentInDB,
  deleteTournamentFromDB,
} from "./tournament.repository";

import {
  CreateTournamentInput,
  UpdateTournamentInput,
} from "./tournament.types";

// ✅ CREATE TOURNAMENT
export const createTournamentService = async (data: any) => {
  // 1. Validate dates
  const start = new Date(data.startDate);
  const end = new Date(data.endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error("Invalid startDate or endDate");
  }

  if (end < start) {
    throw new Error("End date cannot be earlier than start date");
  }

  // 2. Send to DB (converted to Date)
  return await createTournamentInDB({
    ...data,
    startDate: start,
    endDate: end,
  });
};

// ✅ GET ALL TOURNAMENTS
export const getAllTournamentsService = async () => {
  return await getAllTournamentsFromDB();
};

// ✅ GET ONE TOURNAMENT
export const getTournamentByIdService = async (id: string) => {
  const tournament = await getTournamentByIdFromDB(id);

  if (!tournament) {
    throw new Error("Tournament not found");
  }

  return tournament;
};

// ✅ UPDATE TOURNAMENT
export const updateTournamentService = async (
  id: string,
  data: UpdateTournamentInput,
) => {
  const updatedData: any = { ...data };

  // convert dates only if they exist
  if (data.startDate) {
    const start = new Date(data.startDate);
    if (isNaN(start.getTime())) throw new Error("Invalid startDate");
    updatedData.startDate = start;
  }

  if (data.endDate) {
    const end = new Date(data.endDate);
    if (isNaN(end.getTime())) throw new Error("Invalid endDate");
    updatedData.endDate = end;
  }

  // validate range if both exist
  if (updatedData.startDate && updatedData.endDate) {
    if (updatedData.endDate < updatedData.startDate) {
      throw new Error("End date cannot be earlier than start date");
    }
  }

  return await updateTournamentInDB(id, updatedData);
};

// ✅ DELETE TOURNAMENT
export const deleteTournamentService = async (id: string) => {
  return await deleteTournamentFromDB(id);
};
