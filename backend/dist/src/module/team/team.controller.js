"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeamByIdController = exports.getAllTeamsController = exports.createTeamController = void 0;
const team_service_1 = require("./team.service");
const asyncHandler_middleware_1 = require("../../middleware/asyncHandler.middleware");
// CREATE TEAM
exports.createTeamController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const team = await (0, team_service_1.createTeamService)(req.body);
    return res.status(201).json({
        success: true,
        data: team,
    });
});
// GET ALL TEAMS
exports.getAllTeamsController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const teams = await (0, team_service_1.getAllTeamsService)();
    return res.status(200).json({
        success: true,
        data: teams || [],
    });
});
// GET TEAM BY ID (FIXED TYPE ISSUE)
exports.getTeamByIdController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    // ✅ SAFE TYPE GUARD (fixes your error)
    const teamId = Array.isArray(id) ? id[0] : id;
    const team = await (0, team_service_1.getTeamByIdService)(teamId);
    return res.status(200).json({
        success: true,
        data: team,
    });
});
