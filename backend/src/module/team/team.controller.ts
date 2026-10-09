// src/module/team/team.controller.ts

import { Request, Response } from "express";

import {
  createTeamService,
  getAllTeamsService,
  getTeamByIdService,
  getMyTeamService,
} from "./team.service";

import { asyncHandler } from "../../middleware/asyncHandler.middleware";

/*
=========================
CREATE TEAM
=========================
*/

export const createTeamController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,

        message: "Unauthorized",
      });
    }

    const managerId = req.user.id;

    const team = await createTeamService({
      ...req.body,

      managerId,
    });

    return res.status(201).json({
      success: true,

      data: team,
    });
  },
);

/*
=========================
GET ALL TEAMS
(ADMIN)
=========================
*/

export const getAllTeamsController = asyncHandler(
  async (req: Request, res: Response) => {
    const teams = await getAllTeamsService();

    return res.status(200).json({
      success: true,

      data: teams,
    });
  },
);

/*
=========================
GET TEAM BY ID
=========================
*/

export const getTeamByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,

        message: "Team ID is required",
      });
    }

    const team = await getTeamByIdService(id);

    return res.status(200).json({
      success: true,

      data: team,
    });
  },
);

/*
=========================
GET MY TEAM
(TEAM MANAGER)
=========================
*/

export const getMyTeamController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,

        message: "Unauthorized",
      });
    }

    const managerId = req.user.id;

    const team = await getMyTeamService(managerId);

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
  },
);
