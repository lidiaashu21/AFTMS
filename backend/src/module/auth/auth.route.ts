import { Router } from "express";
import {
  registerController,
  loginController,
  googleLoginController,
  createAdminController,
  getAllAdminsController,
  getAdminByIdController,
  updateAdminController,
  deleteAdminController,
} from "./auth.controller";

import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/autherize";

const router = Router();

/* AUTH */
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/google", googleLoginController);

/* ADMIN CREATE */
router.post(
  "/create-admin",
  authenticate,
  authorize("ADMIN"),
  createAdminController,
);

/* ADMIN CRUD */
router.get("/admins", authenticate, authorize("ADMIN"), getAllAdminsController);
router.get(
  "/admins/:id",
  authenticate,
  authorize("ADMIN"),
  getAdminByIdController,
);
router.put(
  "/admins/:id",
  authenticate,
  authorize("ADMIN"),
  updateAdminController,
);
router.delete(
  "/admins/:id",
  authenticate,
  authorize("ADMIN"),
  deleteAdminController,
);

export default router;
