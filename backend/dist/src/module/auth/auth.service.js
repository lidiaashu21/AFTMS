"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdminService = exports.updateAdminService = exports.getAdminByIdService = exports.getAllAdminsService = exports.loginService = exports.createAdminService = exports.registerService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
const auth_repository_1 = require("./auth.repository");
/* ================= REGISTER ================= */
const registerService = async (data) => {
    const existing = await (0, auth_repository_1.findUserByEmail)(data.email);
    if (existing)
        throw new Error("User already exists");
    const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
    return (0, auth_repository_1.createUser)({
        ...data,
        password: hashedPassword,
        role: "TEAM_MANAGER",
    });
};
exports.registerService = registerService;
/* ================= CREATE ADMIN ================= */
const createAdminService = async (data) => {
    const existing = await (0, auth_repository_1.findUserByEmail)(data.email);
    if (existing)
        throw new Error("Admin already exists");
    const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
    return (0, auth_repository_1.createUser)({
        ...data,
        password: hashedPassword,
        role: "ADMIN",
    });
};
exports.createAdminService = createAdminService;
/* ================= LOGIN ================= */
const loginService = async (data) => {
    const user = await (0, auth_repository_1.findUserByEmail)(data.email);
    if (!user)
        throw new Error("User not found");
    const isValid = await bcrypt_1.default.compare(data.password, user.password);
    if (!isValid)
        throw new Error("Invalid credentials");
    const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, env_1.env.JWT_SECRET, {
        expiresIn: env_1.env.JWT_EXPIRES_IN,
    });
    return { user, token };
};
exports.loginService = loginService;
/* ================= ADMIN CRUD ================= */
const getAllAdminsService = async () => {
    return (0, auth_repository_1.findAdmins)();
};
exports.getAllAdminsService = getAllAdminsService;
const getAdminByIdService = async (id) => {
    const admin = await (0, auth_repository_1.findAdminById)(id);
    if (!admin)
        throw new Error("Admin not found");
    return admin;
};
exports.getAdminByIdService = getAdminByIdService;
const updateAdminService = async (id, data) => {
    return (0, auth_repository_1.updateAdmin)(id, data);
};
exports.updateAdminService = updateAdminService;
const deleteAdminService = async (id) => {
    return (0, auth_repository_1.deleteAdmin)(id);
};
exports.deleteAdminService = deleteAdminService;
