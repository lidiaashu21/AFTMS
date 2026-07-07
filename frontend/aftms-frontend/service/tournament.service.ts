import api from "./api";
import type {
  Tournament,
  CreateTournamentInput,
} from "../types/tournament.types";

export const getTournaments = async (): Promise<Tournament[]> => {
  const res = await api.get("/tournaments");
  return res.data;
};

export const createTournament = async (
  data: CreateTournamentInput,
): Promise<Tournament> => {
  const res = await api.post("/tournaments", data);
  return res.data;
};
