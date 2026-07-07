import api from "./api";
import type { Team, CreateTeamInput } from "../types/team.types";

export const getTeams = async (): Promise<Team[]> => {
  const res = await api.get("/teams");
  return res.data;
};

export const createTeam = async (data: CreateTeamInput): Promise<Team> => {
  const res = await api.post("/teams", data);
  return res.data;
};

export const updateTeamStatus = async (
  id: string,
  status: Team["status"],
): Promise<Team> => {
  const res = await api.patch(`/teams/${id}/status`, { status });
  return res.data;
};
