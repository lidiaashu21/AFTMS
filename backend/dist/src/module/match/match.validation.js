"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMatchSchema = void 0;
const zod_1 = require("zod");
// =========================
// UPDATE MATCH VALIDATION
// =========================
exports.updateMatchSchema = zod_1.z.object({
    homeScore: zod_1.z.coerce.number().min(0, "Home score cannot be negative"),
    awayScore: zod_1.z.coerce.number().min(0, "Away score cannot be negative"),
    status: zod_1.z.enum(["UPCOMING", "ONGOING", "COMPLETED"]),
});
