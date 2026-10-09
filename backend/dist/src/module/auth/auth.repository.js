"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdmin = exports.updateAdmin = exports.findAdminById = exports.findAdmins = exports.findUserById = exports.createUser = exports.findUserByEmail = void 0;
const drizzle_1 = __importDefault(require("../../config/drizzle"));
const user_1 = require("../../db/schema/user");
const drizzle_orm_1 = require("drizzle-orm");
/* ================= USER BY EMAIL ================= */
const findUserByEmail = async (email) => {
    const result = await drizzle_1.default.select().from(user_1.users).where((0, drizzle_orm_1.eq)(user_1.users.email, email));
    return result[0] || null;
};
exports.findUserByEmail = findUserByEmail;
/* ================= CREATE USER ================= */
const createUser = async (data) => {
    const result = await drizzle_1.default
        .insert(user_1.users)
        .values({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
    })
        .returning({
        id: user_1.users.id,
        name: user_1.users.name,
        email: user_1.users.email,
        role: user_1.users.role,
        createdAt: user_1.users.createdAt,
    });
    return result[0];
};
exports.createUser = createUser;
/* ================= FIND USER BY ID ================= */
const findUserById = async (id) => {
    const result = await drizzle_1.default
        .select({
        id: user_1.users.id,
        name: user_1.users.name,
        email: user_1.users.email,
        role: user_1.users.role,
        createdAt: user_1.users.createdAt,
    })
        .from(user_1.users)
        .where((0, drizzle_orm_1.eq)(user_1.users.id, id));
    return result[0] || null;
};
exports.findUserById = findUserById;
/* ================= ADMIN MANAGEMENT ================= */
/* GET ALL ADMINS */
const findAdmins = async () => {
    return await drizzle_1.default
        .select({
        id: user_1.users.id,
        name: user_1.users.name,
        email: user_1.users.email,
        role: user_1.users.role,
        createdAt: user_1.users.createdAt,
    })
        .from(user_1.users)
        .where((0, drizzle_orm_1.eq)(user_1.users.role, "ADMIN"))
        .orderBy((0, drizzle_orm_1.desc)(user_1.users.createdAt));
};
exports.findAdmins = findAdmins;
/* GET ADMIN BY ID */
const findAdminById = async (id) => {
    const result = await drizzle_1.default
        .select({
        id: user_1.users.id,
        name: user_1.users.name,
        email: user_1.users.email,
        role: user_1.users.role,
        createdAt: user_1.users.createdAt,
    })
        .from(user_1.users)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(user_1.users.id, id), (0, drizzle_orm_1.eq)(user_1.users.role, "ADMIN")));
    return result[0] || null;
};
exports.findAdminById = findAdminById;
/* UPDATE ADMIN */
const updateAdmin = async (id, data) => {
    const result = await drizzle_1.default
        .update(user_1.users)
        .set(data)
        .where((0, drizzle_orm_1.eq)(user_1.users.id, id))
        .returning({
        id: user_1.users.id,
        name: user_1.users.name,
        email: user_1.users.email,
        role: user_1.users.role,
        createdAt: user_1.users.createdAt,
    });
    return result[0];
};
exports.updateAdmin = updateAdmin;
/* DELETE ADMIN */
const deleteAdmin = async (id) => {
    const result = await drizzle_1.default.delete(user_1.users).where((0, drizzle_orm_1.eq)(user_1.users.id, id)).returning({
        id: user_1.users.id,
        name: user_1.users.name,
        email: user_1.users.email,
        role: user_1.users.role,
        createdAt: user_1.users.createdAt,
    });
    return result[0] || null;
};
exports.deleteAdmin = deleteAdmin;
