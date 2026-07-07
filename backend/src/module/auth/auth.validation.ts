import { z } from "zod";

/**
 * Public Registration
 * Only Team Managers can register.
 * The role is assigned automatically in the backend.
 */
export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters long."),

    email: z.string().email("Please enter a valid email address."),

    password: z.string().min(6, "Password must be at least 6 characters long."),
  }),
});

/**
 * Login
 */
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Please enter a valid email address."),

    password: z.string().min(6, "Password is required."),
  }),
});

/**
 * Create Admin
 * Only an authenticated ADMIN can access this endpoint.
 * The backend automatically assigns role = "ADMIN".
 */
export const createAdminSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters long."),

    email: z.string().email("Please enter a valid email address."),

    password: z.string().min(6, "Password must be at least 6 characters long."),
  }),
});
