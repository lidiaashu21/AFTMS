"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMatchInDB = exports.getMatchesFromDB = void 0;
const prisma_1 = require("../../config/prisma");
const getMatchesFromDB = async () => {
    return prisma_1.prisma.match.findMany({
        include: {
            fixture: {
                include: {
                    homeTeam: true,
                    awayTeam: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.getMatchesFromDB = getMatchesFromDB;
const updateMatchInDB = async (id, data) => {
    return prisma_1.prisma.match.update({
        where: { id },
        data: {
            homeScore: data.homeScore,
            awayScore: data.awayScore,
            status: data.status,
        },
        include: {
            fixture: {
                include: {
                    homeTeam: true,
                    awayTeam: true,
                },
            },
        },
    });
};
exports.updateMatchInDB = updateMatchInDB;
