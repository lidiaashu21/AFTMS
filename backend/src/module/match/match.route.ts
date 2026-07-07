import { Router } from "express";
import {
  getMatchesController,
  updateMatchController,
} from "./match.controller";
import { validate } from "../../middleware/validation.middleware";
import { updateMatchSchema } from "./match.validation";

const router = Router();

router.get("/", getMatchesController);
router.patch("/:id", updateMatchController);

export default router;
