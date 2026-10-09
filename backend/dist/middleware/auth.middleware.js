"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const drizzle_1 = __importDefault(require("../config/drizzle"));
const user_1 = require("../db/schema/user");
const drizzle_orm_1 = require("drizzle-orm");
const env_1 = require("../config/env");
const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                success: false,
                message: "Authentication token is missing.",
            });
            return;
        }
        const token = authHeader.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
        // ✅ DRIZZLE REPLACEMENT (Prisma → Drizzle)
        const result = await drizzle_1.default
            .select({
            id: user_1.users.id,
            email: user_1.users.email,
            role: user_1.users.role,
        })
            .from(user_1.users)
            .where((0, drizzle_orm_1.eq)(user_1.users.id, decoded.userId))
            .limit(1);
        const user = result[0];
        if (!user) {
            res.status(401).json({
                success: false,
                message: "User not found.",
            });
            return;
        }
        req.user = user;
        next();
    }
    catch {
        res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });
    }
};
exports.authenticate = authenticate;
