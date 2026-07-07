"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdminSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
/**
 * Public Registration
 * Only Team Managers can register.
 * The role is assigned automatically in the backend.
 */
exports.registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2, "Name must be at least 2 characters long."),
        email: zod_1.z.string().email("Please enter a valid email address."),
        password: zod_1.z.string().min(6, "Password must be at least 6 characters long."),
    }),
});
/**
 * Login
 */
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email("Please enter a valid email address."),
        password: zod_1.z.string().min(6, "Password is required."),
    }),
});
/**
 * Create Admin
 * Only an authenticated ADMIN can access this endpoint.
 * The backend automatically assigns role = "ADMIN".
 */
exports.createAdminSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2, "Name must be at least 2 characters long."),
        email: zod_1.z.string().email("Please enter a valid email address."),
        password: zod_1.z.string().min(6, "Password must be at least 6 characters long."),
    }),
});
