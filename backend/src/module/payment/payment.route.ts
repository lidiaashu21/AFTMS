import { Router } from "express";

import { validate } from "../../middleware/validation.middleware";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/autherize";

import {
  createPaymentSchema,
  updatePaymentStatusSchema,
} from "./payment.validation";

import {
  createPaymentController,
  getAllPaymentsController,
  getPaymentByIdController,
  updatePaymentStatusController,
} from "./payment.controller";

const router = Router();

router.post("/", validate(createPaymentSchema), createPaymentController);

router.get("/", getAllPaymentsController);

router.get("/:id", getPaymentByIdController);

router.patch(
  "/:id/status",
  authenticate,
  authorize("ADMIN"),
  validate(updatePaymentStatusSchema),
  updatePaymentStatusController,
);

export default router;
