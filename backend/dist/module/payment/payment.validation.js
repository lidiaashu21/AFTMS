"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentStatusSchema = exports.createPaymentSchema = void 0;
const zod_1 = require("zod");
exports.createPaymentSchema = zod_1.z.object({
    body: zod_1.z.object({
        teamId: zod_1.z.string(),
        tournamentId: zod_1.z.string(),
        amount: zod_1.z.number().min(1),
        receiptUrl: zod_1.z.string().optional(),
        method: zod_1.z.enum(["TELEBIRR", "CASH", "BANK"]),
    }),
});
exports.updatePaymentStatusSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["PENDING", "APPROVED", "REJECTED"]),
    }),
});
