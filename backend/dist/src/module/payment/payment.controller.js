"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentStatusController = exports.getPaymentByIdController = exports.getAllPaymentsController = exports.createPaymentController = void 0;
const payment_service_1 = require("./payment.service");
// CREATE
const createPaymentController = async (req, res) => {
    try {
        const data = await (0, payment_service_1.createPaymentService)(req.body);
        return res.status(201).json({
            success: true,
            data,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.createPaymentController = createPaymentController;
// GET ALL
const getAllPaymentsController = async (req, res) => {
    try {
        const data = await (0, payment_service_1.getAllPaymentsService)();
        return res.status(200).json({
            success: true,
            data,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getAllPaymentsController = getAllPaymentsController;
// GET BY ID
const getPaymentByIdController = async (req, res) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Payment ID is required",
            });
        }
        const data = await (0, payment_service_1.getPaymentByIdService)(id);
        return res.status(200).json({
            success: true,
            data,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getPaymentByIdController = getPaymentByIdController;
// UPDATE STATUS
const updatePaymentStatusController = async (req, res) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const { status } = req.body;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Payment ID is required",
            });
        }
        const data = await (0, payment_service_1.updatePaymentStatusService)(id, status);
        return res.status(200).json({
            success: true,
            data,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.updatePaymentStatusController = updatePaymentStatusController;
