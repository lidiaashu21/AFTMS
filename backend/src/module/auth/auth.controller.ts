import { Request, Response } from "express";
import {
  registerService,
  loginService,
  googleLoginService,
  createAdminService,
  getAllAdminsService,
  getAdminByIdService,
  updateAdminService,
  deleteAdminService,
} from "./auth.service";

/* REGISTER */
export const registerController = async (req: Request, res: Response) => {
  try {
    const user = await registerService(req.body);

    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

/* CREATE ADMIN */
export const createAdminController = async (req: Request, res: Response) => {
  try {
    const admin = await createAdminService(req.body);

    return res.status(201).json({
      success: true,
      data: admin,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

/* LOGIN */
export const loginController = async (req: Request, res: Response) => {
  try {
    const result = await loginService(req.body);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

/* GOOGLE LOGIN */
export const googleLoginController = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: "idToken is required.",
      });
    }

    const result = await googleLoginService(idToken);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

/* GET ALL ADMINS */
export const getAllAdminsController = async (req: Request, res: Response) => {
  try {
    const admins = await getAllAdminsService();

    return res.status(200).json({
      success: true,
      data: admins,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* GET ADMIN BY ID */
export const getAdminByIdController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const admin = await getAdminByIdService(id);

    return res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (err: any) {
    return res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

/* UPDATE ADMIN */
export const updateAdminController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const admin = await updateAdminService(id, req.body);

    return res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

/* DELETE ADMIN */
export const deleteAdminController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    await deleteAdminService(id);

    return res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
