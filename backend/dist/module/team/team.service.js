"use strict";
// src/module/team/team.service.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyTeamService = exports.getTeamByIdService = exports.getAllTeamsService = exports.createTeamService = void 0;
const team_repository_1 = require("./team.repository");
/*
=========================
CREATE TEAM
=========================
*/
const createTeamService = async (data) => {
    return await (0, team_repository_1.createTeamInDB)(data);
};
exports.createTeamService = createTeamService;
/*
=========================
GET ALL TEAMS
(ADMIN)
=========================
*/
const getAllTeamsService = async () => {
    return await (0, team_repository_1.getAllTeamsFromDB)();
};
exports.getAllTeamsService = getAllTeamsService;
/*
=========================
GET TEAM BY ID
=========================
*/
const getTeamByIdService = async (id) => {
    const team = await (0, team_repository_1.getTeamByIdFromDB)(id);
    if (!team) {
        throw new Error("Team not found");
    }
    return team;
};
exports.getTeamByIdService = getTeamByIdService;
/*
=========================
GET MY TEAM
(TEAM MANAGER)
=========================
*/
const getMyTeamService = async (managerId) => {
    const team = await (0, team_repository_1.getTeamByManagerIdFromDB)(managerId);
    if (!team) {
        throw new Error("Team not found");
    }
    return team;
};
exports.getMyTeamService = getMyTeamService;
