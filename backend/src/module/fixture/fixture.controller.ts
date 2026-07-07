import { Request, Response } from "express";

import {
  createFixtureService,
  getFixturesService,
  updateFixtureService,
  deleteFixtureService,
} from "./fixture.service";

/*
==================================================
CREATE FIXTURE
==================================================
*/

export const createFixtureController = async (req: Request, res: Response) => {
  try {
    const data = await createFixtureService(req.body);

    return res.status(201).json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error("CREATE FIXTURE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create fixture",
    });
  }
};

/*
==================================================
GET ALL FIXTURES
==================================================
*/

export const getFixturesController = async (req: Request, res: Response) => {
  try {
    const data = await getFixturesService();

    return res.json({
      success: true,
      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
==================================================
UPDATE FIXTURE
==================================================
*/

export const updateFixtureController = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Fixture id required",
      });
    }

    const data = await updateFixtureService(id, req.body);

    return res.json({
      success: true,

      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

/*
==================================================
DELETE FIXTURE
==================================================
*/

export const deleteFixtureController = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,

        message: "Fixture id required",
      });
    }

    await deleteFixtureService(id);

    return res.json({
      success: true,

      message: "Fixture deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
