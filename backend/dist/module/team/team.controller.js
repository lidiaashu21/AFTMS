"use strict";
// src/module/team/team.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyTeamController = exports.getTeamByIdController = exports.getAllTeamsController = exports.createTeamController = void 0;
const team_service_1 = require("./team.service");
const asyncHandler_middleware_1 = require("../../middleware/asyncHandler.middleware");
/*
=========================
CREATE TEAM
=========================
*/
exports.createTeamController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }
    const managerId = req.user.id;
    const team = await (0, team_service_1.createTeamService)({
        ...req.body,
        managerId,
    });
    return res.status(201).json({
        success: true,
        data: team,
    });
});
/*
=========================
GET ALL TEAMS
(ADMIN)
=========================
*/
exports.getAllTeamsController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const teams = await (0, team_service_1.getAllTeamsService)();
    return res.status(200).json({
        success: true,
        data: teams,
    });
});
/*
=========================
GET TEAM BY ID
=========================
*/
exports.getTeamByIdController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Team ID is required",
        });
    }
    const team = await (0, team_service_1.getTeamByIdService)(id);
    return res.status(200).json({
        success: true,
        data: team,
    });
});
/*
=========================
GET MY TEAM
(TEAM MANAGER)
=========================
*/
exports.getMyTeamController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }
    const managerId = req.user.id;
    const team = await (0, team_service_1.getMyTeamService)(managerId);
    if (!team) {
        return res.status(404).json({
            success: false,
            message: "You have not created a team yet",
        });
    }
    return res.status(200).json({
        success: true,
        data: team,
    });
});
