"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = void 0;
const register_service_1 = require("./register.service");
const registerController = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const result = await (0, register_service_1.registerTeamWithPayment)(req.body, req.user.id);
        return res.status(201).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Registration failed",
        });
    }
};
exports.registerController = registerController;
