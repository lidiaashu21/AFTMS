"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentStatusController = exports.getPaymentByIdController = exports.getAllPaymentsController = exports.createPaymentController = void 0;
const payment_service_1 = require("./payment.service");
/* =========================
   CREATE PAYMENT
========================= */
const createPaymentController = async (req, res) => {
    try {
        const payment = await (0, payment_service_1.createPaymentService)(req.body);
        return res.status(201).json({
            success: true,
            data: payment,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal Server Error",
        });
    }
};
exports.createPaymentController = createPaymentController;
/* =========================
   GET ALL PAYMENTS
========================= */
const getAllPaymentsController = async (req, res) => {
    try {
        const payments = await (0, payment_service_1.getAllPaymentsService)();
        return res.status(200).json({
            success: true,
            data: payments,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal Server Error",
        });
    }
};
exports.getAllPaymentsController = getAllPaymentsController;
/* =========================
   GET PAYMENT BY ID
========================= */
const getPaymentByIdController = async (req, res) => {
    try {
        // Fix TypeScript error
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Payment ID is required",
            });
        }
        const payment = await (0, payment_service_1.getPaymentByIdService)(id);
        return res.status(200).json({
            success: true,
            data: payment,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal Server Error",
        });
    }
};
exports.getPaymentByIdController = getPaymentByIdController;
/* =========================
   UPDATE PAYMENT STATUS
========================= */
const updatePaymentStatusController = async (req, res) => {
    try {
        // Fix TypeScript error
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Payment ID is required",
            });
        }
        const status = req.body.status;
        const payment = await (0, payment_service_1.updatePaymentStatusService)(id, status);
        return res.status(200).json({
            success: true,
            message: "Payment status updated successfully",
            data: payment,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal Server Error",
        });
    }
};
exports.updatePaymentStatusController = updatePaymentStatusController;
