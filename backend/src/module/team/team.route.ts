import { Router } from "express";

import {
  createTeamController,
  getAllTeamsController,
  getTeamByIdController,
} from "./team.controller";

const router = Router();

router.post("/", createTeamController);

router.get("/", getAllTeamsController);

router.get("/:id", getTeamByIdController);

export default router;
