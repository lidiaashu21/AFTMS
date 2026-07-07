import { Router } from "express";
import { validate } from "../../middleware/validation.middleware";

import { createAnnouncementSchema } from "./announcement.validation";

import {
  createAnnouncementController,
  getAnnouncementsController,
  deleteAnnouncementController,
} from "./announcement.controller";

const router = Router();

router.post(
  "/",
  validate(createAnnouncementSchema),
  createAnnouncementController,
);

router.get("/", getAnnouncementsController);

router.delete("/:id", deleteAnnouncementController);

export default router;
