import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("ERROR:", err);

  // Prisma error handling (basic)
  if (err.code === "P2002") {
    return res.status(400).json({
      success: false,
      message: "Duplicate field error",
    });
  }

  // JWT error
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token expired",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
