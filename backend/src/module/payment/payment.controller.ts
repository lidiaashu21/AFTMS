import { Request, Response } from "express";

import {
  createPaymentService,
  getAllPaymentsService,
  getPaymentByIdService,
  updatePaymentStatusService,
} from "./payment.service";

import { PaymentStatus } from "./payment.types";

/* =========================
   CREATE PAYMENT
========================= */
export const createPaymentController = async (req: Request, res: Response) => {
  try {
    const payment = await createPaymentService(req.body);

    return res.status(201).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

/* =========================
   GET ALL PAYMENTS
========================= */
export const getAllPaymentsController = async (req: Request, res: Response) => {
  try {
    const payments = await getAllPaymentsService();

    return res.status(200).json({
      success: true,
      data: payments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

/* =========================
   GET PAYMENT BY ID
========================= */
export const getPaymentByIdController = async (req: Request, res: Response) => {
  try {
    // Fix TypeScript error
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Payment ID is required",
      });
    }

    const payment = await getPaymentByIdService(id);

    return res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

/* =========================
   UPDATE PAYMENT STATUS
========================= */
export const updatePaymentStatusController = async (
  req: Request,
  res: Response,
) => {
  try {
    // Fix TypeScript error
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Payment ID is required",
      });
    }

    const status = req.body.status as PaymentStatus;

    const payment = await updatePaymentStatusService(id, status);

    return res.status(200).json({
      success: true,
      message: "Payment status updated successfully",
      data: payment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};
