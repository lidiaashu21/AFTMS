import { Request, Response, NextFunction } from "express";

type Role = "ADMIN" | "TEAM_MANAGER";

export const authorize = (...allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: Please login first.",
        });
      }

      if (!allowedRoles.includes(user.role as Role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: You don't have permission.",
        });
      }

      next();
    } catch (error) {
      console.error("AUTHORIZATION ERROR:", error);

      return res.status(500).json({
        success: false,
        message: "Authorization failed.",
      });
    }
  };
};
