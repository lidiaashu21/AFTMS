"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdminService = exports.updateAdminService = exports.getAdminByIdService = exports.getAllAdminsService = exports.googleLoginService = exports.loginService = exports.createAdminService = exports.registerService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = require("crypto");
const google_auth_library_1 = require("google-auth-library");
const env_1 = require("../../config/env");
const auth_repository_1 = require("./auth.repository");
const googleClient = new google_auth_library_1.OAuth2Client(env_1.env.GOOGLE_CLIENT_ID);
const signToken = (user) => jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, env_1.env.JWT_SECRET, {
    expiresIn: env_1.env.JWT_EXPIRES_IN,
});
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
    const token = signToken(user);
    return { user, token };
};
exports.loginService = loginService;
/* ================= GOOGLE LOGIN ================= */
const googleLoginService = async (idToken) => {
    if (!env_1.env.GOOGLE_CLIENT_ID) {
        throw new Error("Google sign-in is not configured on the server.");
    }
    const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: env_1.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload?.email) {
        throw new Error("Invalid Google token.");
    }
    const existingUser = await (0, auth_repository_1.findUserByEmail)(payload.email);
    // Accounts created via Google don't have a password the user knows;
    // store a random hash since the column is required, and the user
    // will always authenticate via Google going forward.
    const user = existingUser ??
        (await (0, auth_repository_1.createUser)({
            name: payload.name || payload.email,
            email: payload.email,
            password: await bcrypt_1.default.hash((0, crypto_1.randomUUID)(), 10),
            role: "TEAM_MANAGER",
        }));
    const token = signToken(user);
    return { user, token };
};
exports.googleLoginService = googleLoginService;
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
