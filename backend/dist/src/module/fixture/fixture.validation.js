"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFixtureSchema = exports.createFixtureSchema = void 0;
const zod_1 = require("zod");
/*
  Your database currently contains:
  - UUID ids from Drizzle
  - CUID ids from old Prisma records

  So we accept both.
*/
const idSchema = zod_1.z.string().min(1);
exports.createFixtureSchema = zod_1.z.object({
    body: zod_1.z.object({
        tournamentId: idSchema,
        homeTeamId: idSchema,
        awayTeamId: idSchema,
        matchDate: zod_1.z.string().min(1),
    }),
});
exports.updateFixtureSchema = zod_1.z.object({
    body: zod_1.z.object({
        tournamentId: idSchema.optional(),
        homeTeamId: idSchema.optional(),
        awayTeamId: idSchema.optional(),
        matchDate: zod_1.z.string().optional(),
    }),
});
