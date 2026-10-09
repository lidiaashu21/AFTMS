"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeamByIdService = exports.getAllTeamsService = exports.createTeamService = void 0;
const team_repository_1 = require("./team.repository");
// ✅ CREATE TEAM SERVICE
const createTeamService = async (data) => {
    const team = await (0, team_repository_1.createTeamInDB)(data);
    return {
        id: team.id,
        name: team.name,
        coachName: team.coachName,
        contactEmail: team.contactEmail,
        createdAt: team.createdAt,
    };
};
exports.createTeamService = createTeamService;
// ✅ GET ALL TEAMS SERVICE
const getAllTeamsService = async () => {
    const teams = await (0, team_repository_1.getAllTeamsFromDB)();
    return teams.map((team) => ({
        id: team.id,
        name: team.name,
        coachName: team.coachName,
        contactEmail: team.contactEmail,
        createdAt: team.createdAt,
    }));
};
exports.getAllTeamsService = getAllTeamsService;
// ✅ GET TEAM BY ID SERVICE
const getTeamByIdService = async (id) => {
    const team = await (0, team_repository_1.getTeamByIdFromDB)(id);
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
exports.getTeamByIdService = getTeamByIdService;
