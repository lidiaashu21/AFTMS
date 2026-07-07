import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: result.error.format(),
      });
    }

    // store validated data safely
    (req as any).validated = result.data;

    next();
  };
