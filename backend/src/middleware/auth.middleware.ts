import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import db from "../config/drizzle";
import { users } from "../db/schema/user";

import { eq } from "drizzle-orm";
import { env } from "../config/env";

interface JwtPayload {
  userId: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Authentication token is missing.",
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    // ✅ DRIZZLE REPLACEMENT (Prisma → Drizzle)
    const result = await db
      .select({
        id: users.id,
        email: users.email,
        role: users.role,
      })
      .from(users)
      .where(eq(users.id, decoded.userId))
      .limit(1);

    const user = result[0];

    if (!user) {
      res.status(401).json({
        success: false,
        message: "User not found.",
      });
      return;
    }

    req.user = user;

    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};
