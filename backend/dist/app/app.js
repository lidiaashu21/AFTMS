"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("../routes"));
const client_1 = require("../db/client");
const drizzle_orm_1 = require("drizzle-orm");
const user_1 = require("../db/schema/user"); // <-- change path if your schema location is different
const app = (0, express_1.default)();
// =========================
// Middlewares
// =========================
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// =========================
// Health check route
// =========================
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend is running successfully 🚀",
    });
});
// =========================
// Database connection test
// =========================
app.get("/db-test", async (req, res) => {
    try {
        const result = await client_1.db.execute((0, drizzle_orm_1.sql) `SELECT NOW()`);
        res.status(200).json({
            success: true,
            database: "connected",
            time: result,
        });
    }
    catch (error) {
        console.error("Database connection error:", error);
        res.status(500).json({
            success: false,
            message: "Database connection failed",
        });
    }
});
// =========================
// User table test
// =========================
app.get("/user-test", async (req, res) => {
    try {
        const result = await client_1.db.select().from(user_1.users);
        res.status(200).json({
            success: true,
            table: "user",
            data: result,
        });
    }
    catch (error) {
        console.error("User table error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch user table",
            error,
        });
    }
});
// =========================
// API routes
// =========================
app.use("/api", routes_1.default);
// =========================
// 404 handler
// =========================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
    });
});
exports.default = app;
