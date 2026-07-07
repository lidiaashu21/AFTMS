"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentStatusInDB = exports.getPaymentByIdFromDB = exports.getAllPaymentsFromDB = exports.createPaymentInDB = void 0;
const prisma_1 = require("../../config/prisma");
const createPaymentInDB = async (data) => {
    return prisma_1.prisma.payment.create({
        data,
    });
};
exports.createPaymentInDB = createPaymentInDB;
// ✅ FIX: include team safely (only if relation exists)
const getAllPaymentsFromDB = async () => {
    return prisma_1.prisma.payment.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            team: true, // make sure schema has team relation
        },
    });
};
exports.getAllPaymentsFromDB = getAllPaymentsFromDB;
const getPaymentByIdFromDB = async (id) => {
    return prisma_1.prisma.payment.findUnique({
        where: { id },
        include: {
            team: true,
        },
    });
};
exports.getPaymentByIdFromDB = getPaymentByIdFromDB;
// ✅ FIX: explicit typing + safe update
const updatePaymentStatusInDB = async (id, status) => {
    return prisma_1.prisma.payment.update({
        where: { id },
        data: {
            status,
        },
    });
};
exports.updatePaymentStatusInDB = updatePaymentStatusInDB;
