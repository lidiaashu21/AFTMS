import { Request, Response } from "express";
import { registerTeamWithPayment } from "./register.service";

export const registerController = async (req: Request, res: Response) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const result = await registerTeamWithPayment(req.body);

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Registration failed",
    });
  }
};
