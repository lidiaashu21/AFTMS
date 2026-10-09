"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_middleware_1 = require("../../middleware/validation.middleware");
const payment_validation_1 = require("./payment.validation");
const payment_controller_1 = require("./payment.controller");
const router = (0, express_1.Router)();
router.post("/", (0, validation_middleware_1.validate)(payment_validation_1.createPaymentSchema), payment_controller_1.createPaymentController);
router.get("/", payment_controller_1.getAllPaymentsController);
router.get("/:id", payment_controller_1.getPaymentByIdController);
// ✅ FIXED ROUTE (THIS IS WHAT FRONTEND MUST CALL)
router.patch("/:id/status", (0, validation_middleware_1.validate)(payment_validation_1.updatePaymentStatusSchema), payment_controller_1.updatePaymentStatusController);
exports.default = router;
