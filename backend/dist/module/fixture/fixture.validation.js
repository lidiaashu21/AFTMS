"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFixtureSchema = void 0;
const zod_1 = require("zod");
exports.createFixtureSchema = zod_1.z.object({
    body: zod_1.z.object({
        tournamentId: zod_1.z.string(),
        homeTeamId: zod_1.z.string(),
        awayTeamId: zod_1.z.string(),
        matchDate: zod_1.z.string(),
    }),
});
