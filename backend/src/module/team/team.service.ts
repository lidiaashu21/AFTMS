// src/module/team/team.service.ts

import {
  createTeamInDB,
  getAllTeamsFromDB,
  getTeamByIdFromDB,
  getTeamByManagerIdFromDB,
} from "./team.repository";

import { CreateTeamInput } from "./team.types";

/*
=========================
CREATE TEAM
=========================
*/

export const createTeamService = async (data: CreateTeamInput) => {
  return await createTeamInDB(data);
};

/*
=========================
GET ALL TEAMS
(ADMIN)
=========================
*/

export const getAllTeamsService = async () => {
  return await getAllTeamsFromDB();
};

/*
=========================
GET TEAM BY ID
=========================
*/

export const getTeamByIdService = async (id: string) => {
  const team = await getTeamByIdFromDB(id);

  if (!team) {
    throw new Error("Team not found");
  }

  return team;
};

/*
=========================
GET MY TEAM
(TEAM MANAGER)
=========================
*/

export const getMyTeamService = async (managerId: string) => {
  const team = await getTeamByManagerIdFromDB(managerId);

  if (!team) {
    throw new Error("Team not found");
  }

  return team;
};
