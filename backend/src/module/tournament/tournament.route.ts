import { Router } from "express";

import { validate } from "../../middleware/validation.middleware";

import {
  createTournamentSchema,
  updateTournamentSchema,
} from "./tournament.validation";

import {
  createTournamentController,
  getAllTournamentsController,
  getTournamentByIdController,
  updateTournamentController,
  deleteTournamentController,
} from "./tournament.controller";

const router = Router();

router.post("/", validate(createTournamentSchema), createTournamentController);

router.get("/", getAllTournamentsController);

router.get("/:id", getTournamentByIdController);

router.put(
  "/:id",
  validate(updateTournamentSchema),
  updateTournamentController,
);

router.delete("/:id", deleteTournamentController);

export default router;
