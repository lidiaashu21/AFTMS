import { Request, Response } from "express";
import {
  createPaymentService,
  getAllPaymentsService,
  getPaymentByIdService,
  updatePaymentStatusService,
} from "./payment.service";

// CREATE
export const createPaymentController = async (req: Request, res: Response) => {
  try {
    const data = await createPaymentService(req.body);

    return res.status(201).json({
      success: true,
      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL
export const getAllPaymentsController = async (req: Request, res: Response) => {
  try {
    const data = await getAllPaymentsService();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET BY ID
export const getPaymentByIdController = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Payment ID is required",
      });
    }

    const data = await getPaymentByIdService(id);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE STATUS
export const updatePaymentStatusController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    const { status } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Payment ID is required",
      });
    }

    const data = await updatePaymentStatusService(id, status);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
