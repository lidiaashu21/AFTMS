import { z } from "zod";

export const reportQuerySchema = z.object({
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  tournamentId: z.string().optional(),
  teamId: z.string().optional(),
});

export type ReportQuery = z.infer<typeof reportQuerySchema>;
