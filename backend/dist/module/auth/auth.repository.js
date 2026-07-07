"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdmin = exports.updateAdmin = exports.findAdminById = exports.findAdmins = exports.findUserById = exports.createUser = exports.findUserByEmail = void 0;
const prisma_1 = require("../../config/prisma");
/* ================= USER BY EMAIL ================= */
const findUserByEmail = async (email) => {
    return prisma_1.prisma.user.findUnique({
        where: { email },
    });
};
exports.findUserByEmail = findUserByEmail;
/* ================= CREATE USER (REGISTER / ADMIN) ================= */
const createUser = async (data) => {
    return prisma_1.prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });
};
exports.createUser = createUser;
/* ================= FIND USER BY ID ================= */
const findUserById = async (id) => {
    return prisma_1.prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });
};
exports.findUserById = findUserById;
/* =========================================================
   👑 ADMIN MANAGEMENT (NEW ADDITIONS)
   ========================================================= */
/* GET ALL ADMINS */
const findAdmins = async () => {
    return prisma_1.prisma.user.findMany({
        where: { role: "ADMIN" },
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });
};
exports.findAdmins = findAdmins;
/* GET ADMIN BY ID */
const findAdminById = async (id) => {
    return prisma_1.prisma.user.findFirst({
        where: {
            id,
            role: "ADMIN",
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });
};
exports.findAdminById = findAdminById;
/* UPDATE ADMIN */
const updateAdmin = async (id, data) => {
    return prisma_1.prisma.user.update({
        where: { id },
        data,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });
};
exports.updateAdmin = updateAdmin;
/* DELETE ADMIN */
const deleteAdmin = async (id) => {
    return prisma_1.prisma.user.delete({
        where: { id },
    });
};
exports.deleteAdmin = deleteAdmin;
