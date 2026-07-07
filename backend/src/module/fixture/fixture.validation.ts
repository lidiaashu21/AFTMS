import { z } from "zod";

/*
  Your database currently contains:
  - UUID ids from Drizzle
  - CUID ids from old Prisma records

  So we accept both.
*/

const idSchema = z.string().min(1);

export const createFixtureSchema = z.object({
  body: z.object({
    tournamentId: idSchema,

    homeTeamId: idSchema,

    awayTeamId: idSchema,

    matchDate: z.string().min(1),
  }),
});

export const updateFixtureSchema = z.object({
  body: z.object({
    tournamentId: idSchema.optional(),

    homeTeamId: idSchema.optional(),

    awayTeamId: idSchema.optional(),

    matchDate: z.string().optional(),
  }),
});
