import { Request, Response } from "express";
import { getReportsService } from "./report.service";

export const getReportsController = async (req: Request, res: Response) => {
  try {
    const data = await getReportsService();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reports",
    });
  }
};
