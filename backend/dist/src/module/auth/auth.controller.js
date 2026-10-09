"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdminController = exports.updateAdminController = exports.getAdminByIdController = exports.getAllAdminsController = exports.loginController = exports.createAdminController = exports.registerController = void 0;
const auth_service_1 = require("./auth.service");
/* REGISTER */
const registerController = async (req, res) => {
    try {
        const user = await (0, auth_service_1.registerService)(req.body);
        return res.status(201).json({
            success: true,
            data: user,
        });
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
exports.registerController = registerController;
/* CREATE ADMIN */
const createAdminController = async (req, res) => {
    try {
        const admin = await (0, auth_service_1.createAdminService)(req.body);
        return res.status(201).json({
            success: true,
            data: admin,
        });
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
exports.createAdminController = createAdminController;
/* LOGIN */
const loginController = async (req, res) => {
    try {
        const result = await (0, auth_service_1.loginService)(req.body);
        return res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (err) {
        return res.status(401).json({
            success: false,
            message: err.message,
        });
    }
};
exports.loginController = loginController;
/* GET ALL ADMINS */
const getAllAdminsController = async (req, res) => {
    try {
        const admins = await (0, auth_service_1.getAllAdminsService)();
        return res.status(200).json({
            success: true,
            data: admins,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
exports.getAllAdminsController = getAllAdminsController;
/* GET ADMIN BY ID */
const getAdminByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await (0, auth_service_1.getAdminByIdService)(id);
        return res.status(200).json({
            success: true,
            data: admin,
        });
    }
    catch (err) {
        return res.status(404).json({
            success: false,
            message: err.message,
        });
    }
};
exports.getAdminByIdController = getAdminByIdController;
/* UPDATE ADMIN */
const updateAdminController = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await (0, auth_service_1.updateAdminService)(id, req.body);
        return res.status(200).json({
            success: true,
            data: admin,
        });
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
exports.updateAdminController = updateAdminController;
/* DELETE ADMIN */
const deleteAdminController = async (req, res) => {
    try {
        const { id } = req.params;
        await (0, auth_service_1.deleteAdminService)(id);
        return res.status(200).json({
            success: true,
            message: "Admin deleted successfully",
        });
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
exports.deleteAdminController = deleteAdminController;
