import { Router } from "express";

import { validate } from "../../middleware/validation.middleware";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/autherize";

import { createFixtureSchema, updateFixtureSchema } from "./fixture.validation";

import {
  createFixtureController,
  getFixturesController,
  updateFixtureController,
  deleteFixtureController,
} from "./fixture.controller";

const router = Router();

router.get("/", getFixturesController);

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  validate(createFixtureSchema),
  createFixtureController,
);

router.patch(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  validate(updateFixtureSchema),
  updateFixtureController,
);

router.delete("/:id", authenticate, authorize("ADMIN"), deleteFixtureController);

export default router;
