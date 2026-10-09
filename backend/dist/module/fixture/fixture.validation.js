"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFixtureSchema = exports.createFixtureSchema = void 0;
const zod_1 = require("zod");
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
const idSchema = zod_1.z.string().min(1, "ID is required");
/*
==================================================
DATE VALIDATION
==================================================
*/
const dateSchema = zod_1.z
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
exports.createFixtureSchema = zod_1.z.object({
    body: zod_1.z.object({
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
exports.updateFixtureSchema = zod_1.z.object({
    body: zod_1.z.object({
        tournamentId: idSchema.optional(),
        homeTeamId: idSchema.optional(),
        awayTeamId: idSchema.optional(),
        matchDate: dateSchema.optional(),
    }),
});
