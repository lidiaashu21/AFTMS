"use strict";
// src/module/team/team.validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTeamSchema = void 0;
const zod_1 = require("zod");
exports.createTeamSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2, "Team name is required"),
        coachName: zod_1.z.string().min(2, "Coach name is required"),
        contactEmail: zod_1.z.string().email("Valid email is required"),
    }),
});
