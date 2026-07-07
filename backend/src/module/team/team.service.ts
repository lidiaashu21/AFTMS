import {
  createTeamInDB,
  getAllTeamsFromDB,
  getTeamByIdFromDB,
} from "./team.repository";

import { CreateTeamInput } from "./team.types";

// ✅ CREATE TEAM SERVICE
export const createTeamService = async (data: CreateTeamInput) => {
  const team = await createTeamInDB(data);

  return {
    id: team.id,
    name: team.name,
    coachName: team.coachName,
    contactEmail: team.contactEmail,
    createdAt: team.createdAt,
  };
};

// ✅ GET ALL TEAMS SERVICE
export const getAllTeamsService = async () => {
  const teams = await getAllTeamsFromDB();

  return teams.map((team) => ({
    id: team.id,
    name: team.name,
    coachName: team.coachName,
    contactEmail: team.contactEmail,
    createdAt: team.createdAt,
  }));
};

// ✅ GET TEAM BY ID SERVICE
export const getTeamByIdService = async (id: string) => {
  const team = await getTeamByIdFromDB(id);

  if (!team) {
    throw new Error("Team not found");
  }

  return {
    id: team.id,
    name: team.name,
    coachName: team.coachName,
    contactEmail: team.contactEmail,
    createdAt: team.createdAt,
  };
};
