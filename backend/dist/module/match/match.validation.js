"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMatchSchema = void 0;
const zod_1 = require("zod");
// =========================
// ZOD SCHEMA (runtime validation)
// =========================
exports.updateMatchSchema = zod_1.z.object({
    homeScore: zod_1.z.number(),
    awayScore: zod_1.z.number(),
    status: zod_1.z.enum(["UPCOMING", "ONGOING", "COMPLETED"]),
});
