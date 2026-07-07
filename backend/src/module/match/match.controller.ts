import { Request, Response } from "express";

import { getMatchesService, updateMatchService } from "./match.service";

import { updateMatchSchema } from "./match.validation";

const getString = (value: string | string[] | undefined) => {
  return Array.isArray(value) ? value[0] : value;
};

/* =========================
   GET ALL MATCHES
========================= */

export const getMatchesController = async (
  _req: Request,

  res: Response,
) => {
  try {
    const data = await getMatchesService();

    return res.status(200).json({
      success: true,

      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,

      message: error.message || "Failed to fetch matches",
    });
  }
};

/* =========================
   UPDATE MATCH
========================= */

export const updateMatchController = async (
  req: Request,

  res: Response,
) => {
  try {
    const id = getString(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,

        message: "Match id is required",
      });
    }

    console.log("UPDATE MATCH BODY:", JSON.stringify(req.body, null, 2));

    // =========================
    // ZOD VALIDATION
    // =========================

    const validation = updateMatchSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,

        message: "Validation Error",

        errors: validation.error.flatten(),
      });
    }

    const data = await updateMatchService(
      id,

      validation.data,
    );

    return res.status(200).json({
      success: true,

      data,
    });
  } catch (error: any) {
    console.log("UPDATE MATCH ERROR:", error);

    return res.status(500).json({
      success: false,

      message: error.message || "Failed to update match",
    });
  }
};
