"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReportsFromDB = void 0;
const prisma_1 = require("../../config/prisma");
const getReportsFromDB = async () => {
    const [totalTeams, totalTournaments, totalFixtures, totalMatches, totalPayments, approvedPayments, pendingPayments, rejectedPayments,] = await Promise.all([
        prisma_1.prisma.team.count(),
        prisma_1.prisma.tournament.count(),
        prisma_1.prisma.fixture.count(),
        prisma_1.prisma.match.count(),
        prisma_1.prisma.payment.count(),
        prisma_1.prisma.payment.count({ where: { status: "APPROVED" } }),
        prisma_1.prisma.payment.count({ where: { status: "PENDING" } }),
        prisma_1.prisma.payment.count({ where: { status: "REJECTED" } }),
    ]);
    return {
        totalTeams,
        totalTournaments,
        totalFixtures,
        totalMatches,
        totalPayments,
        approvedPayments,
        pendingPayments,
        rejectedPayments,
    };
};
exports.getReportsFromDB = getReportsFromDB;
