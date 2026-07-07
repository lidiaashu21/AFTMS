"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTournamentFromDB = exports.updateTournamentInDB = exports.getTournamentByIdFromDB = exports.getAllTournamentsFromDB = exports.createTournamentInDB = void 0;
const prisma_1 = require("../../config/prisma");
// ✅ CREATE
const createTournamentInDB = async (data) => {
    return prisma_1.prisma.tournament.create({
        data: {
            ...data,
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
        },
    });
};
exports.createTournamentInDB = createTournamentInDB;
// ✅ GET ALL
const getAllTournamentsFromDB = async () => {
    return prisma_1.prisma.tournament.findMany({
        orderBy: { createdAt: "desc" },
    });
};
exports.getAllTournamentsFromDB = getAllTournamentsFromDB;
// ✅ GET BY ID
const getTournamentByIdFromDB = async (id) => {
    return prisma_1.prisma.tournament.findUnique({
        where: { id },
    });
};
exports.getTournamentByIdFromDB = getTournamentByIdFromDB;
// ✅ UPDATE (FIXED - IMPORTANT)
const updateTournamentInDB = async (id, data) => {
    const updatedData = { ...data };
    // convert dates safely
    if (data.startDate) {
        updatedData.startDate = new Date(data.startDate);
    }
    if (data.endDate) {
        updatedData.endDate = new Date(data.endDate);
    }
    return prisma_1.prisma.tournament.update({
        where: { id },
        data: updatedData,
    });
};
exports.updateTournamentInDB = updateTournamentInDB;
// ✅ DELETE
const deleteTournamentFromDB = async (id) => {
    return prisma_1.prisma.tournament.delete({
        where: { id },
    });
};
exports.deleteTournamentFromDB = deleteTournamentFromDB;
