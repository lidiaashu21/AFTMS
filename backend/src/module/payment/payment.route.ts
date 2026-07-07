import { Router } from "express";
import { validate } from "../../middleware/validation.middleware";

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

// ✅ FIXED ROUTE (THIS IS WHAT FRONTEND MUST CALL)
router.patch(
  "/:id/status",
  validate(updatePaymentStatusSchema),
  updatePaymentStatusController,
);

export default router;
