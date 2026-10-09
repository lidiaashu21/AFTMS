"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = void 0;
const register_service_1 = require("./register.service");
const registerController = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);
        const result = await (0, register_service_1.registerTeamWithPayment)(req.body);
        return res.status(201).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.error("REGISTER ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Registration failed",
        });
    }
};
exports.registerController = registerController;
