import { z } from "zod";

/*
==================================================
ID VALIDATION

Supports:
- Drizzle UUID ids
- Old CUID ids

Example:
550e8400-e29b-41d4-a716-446655440000
clx123abc456
==================================================
*/

const idSchema = z.string().min(1, "ID is required");

/*
==================================================
DATE VALIDATION
==================================================
*/

const dateSchema = z
  .string()
  .min(1, "Match date is required")
  .refine((value) => !isNaN(Date.parse(value)), {
    message: "Invalid match date",
  });

/*
==================================================
CREATE FIXTURE VALIDATION
==================================================
*/

export const createFixtureSchema = z.object({
  body: z.object({
    tournamentId: idSchema,

    homeTeamId: idSchema,

    awayTeamId: idSchema,

    matchDate: dateSchema,
  }),
});

/*
==================================================
UPDATE FIXTURE VALIDATION
==================================================
*/

export const updateFixtureSchema = z.object({
  body: z.object({
    tournamentId: idSchema.optional(),

    homeTeamId: idSchema.optional(),

    awayTeamId: idSchema.optional(),

    matchDate: dateSchema.optional(),
  }),
});
