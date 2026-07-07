"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportQuerySchema = void 0;
const zod_1 = require("zod");
exports.reportQuerySchema = zod_1.z.object({
    from: zod_1.z.string().datetime().optional(),
    to: zod_1.z.string().datetime().optional(),
    tournamentId: zod_1.z.string().optional(),
    teamId: zod_1.z.string().optional(),
});
