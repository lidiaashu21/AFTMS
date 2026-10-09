import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validation.middleware";
import { createTeamSchema } from "./team.validation";

import {
  createTeamController,
  getAllTeamsController,
  getTeamByIdController,
} from "./team.controller";

const router = Router();

router.post("/", authenticate, validate(createTeamSchema), createTeamController);

router.get("/", getAllTeamsController);

router.get("/:id", getTeamByIdController);

export default router;
