"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTournamentSchema = exports.createTournamentSchema = void 0;
const zod_1 = require("zod");
// helper to validate date
const dateSchema = zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
});
// CREATE
exports.createTournamentSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z.string().min(2),
        location: zod_1.z.string().min(2),
        fee: zod_1.z.coerce.number().min(0),
        maxTeams: zod_1.z.coerce.number().min(2),
        startDate: dateSchema,
        endDate: dateSchema,
    })
        .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
        message: "End date cannot be earlier than start date",
        path: ["endDate"],
    }),
});
// UPDATE
exports.updateTournamentSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
        fee: zod_1.z.coerce.number().optional(),
        maxTeams: zod_1.z.coerce.number().optional(),
        startDate: dateSchema.optional(),
        endDate: dateSchema.optional(),
        isActive: zod_1.z.boolean().optional(),
    })
        .refine((data) => {
        if (data.startDate && data.endDate) {
            return new Date(data.endDate) >= new Date(data.startDate);
        }
        return true;
    }, {
        message: "End date cannot be earlier than start date",
        path: ["endDate"],
    }),
});
