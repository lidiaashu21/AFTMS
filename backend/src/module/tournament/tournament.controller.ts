import { Request, Response } from "express";

import {
  createTournamentService,
  getAllTournamentsService,
  getTournamentByIdService,
  updateTournamentService,
  deleteTournamentService,
} from "./tournament.service";

// ✅ CREATE
export const createTournamentController = async (
  req: Request,
  res: Response,
) => {
  try {
    const data = await createTournamentService(req.body);

    return res.status(201).json({
      success: true,
      data,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create tournament",
    });
  }
};

// ✅ GET ALL
export const getAllTournamentsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const data = await getAllTournamentsService();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch tournaments",
    });
  }
};

// ✅ GET BY ID
export const getTournamentByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const data = await getTournamentByIdService(req.params.id as string);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message || "Tournament not found",
    });
  }
};

// ✅ UPDATE
export const updateTournamentController = async (
  req: Request,
  res: Response,
) => {
  try {
    const data = await updateTournamentService(
      req.params.id as string,
      req.body,
    );

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update tournament",
    });
  }
};

// ✅ DELETE
export const deleteTournamentController = async (
  req: Request,
  res: Response,
) => {
  try {
    await deleteTournamentService(req.params.id as string);

    return res.status(200).json({
      success: true,
      message: "Tournament deleted successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to delete tournament",
    });
  }
};
