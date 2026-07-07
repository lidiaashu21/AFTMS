import { z } from "zod";

// =========================
// UPDATE MATCH VALIDATION
// =========================

export const updateMatchSchema = z.object({
  homeScore: z.coerce.number().min(0, "Home score cannot be negative"),

  awayScore: z.coerce.number().min(0, "Away score cannot be negative"),

  status: z.enum(["UPCOMING", "ONGOING", "COMPLETED"]),
});

export type UpdateMatchInput = z.infer<typeof updateMatchSchema>;
