import { Router } from "express";

import { validate } from "../../middleware/validation.middleware";

import { createFixtureSchema, updateFixtureSchema } from "./fixture.validation";

import {
  createFixtureController,
  getFixturesController,
  updateFixtureController,
  deleteFixtureController,
} from "./fixture.controller";

const router = Router();

router.get("/", getFixturesController);

router.post("/", validate(createFixtureSchema), createFixtureController);

router.patch("/:id", validate(updateFixtureSchema), updateFixtureController);

router.delete("/:id", deleteFixtureController);

export default router;
