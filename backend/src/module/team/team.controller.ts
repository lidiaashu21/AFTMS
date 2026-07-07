import { Request, Response } from "express";
import {
  createTeamService,
  getAllTeamsService,
  getTeamByIdService,
} from "./team.service";

import { asyncHandler } from "../../middleware/asyncHandler.middleware";

// CREATE TEAM
export const createTeamController = asyncHandler(
  async (req: Request, res: Response) => {
    const team = await createTeamService(req.body);

    return res.status(201).json({
      success: true,
      data: team,
    });
  },
);

// GET ALL TEAMS
export const getAllTeamsController = asyncHandler(
  async (req: Request, res: Response) => {
    const teams = await getAllTeamsService();

    return res.status(200).json({
      success: true,
      data: teams || [],
    });
  },
);

// GET TEAM BY ID (FIXED TYPE ISSUE)
export const getTeamByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    // ✅ SAFE TYPE GUARD (fixes your error)
    const teamId = Array.isArray(id) ? id[0] : id;

    const team = await getTeamByIdService(teamId);

    return res.status(200).json({
      success: true,
      data: team,
    });
  },
);
