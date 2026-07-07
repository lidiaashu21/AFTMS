"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFixtureInDB = exports.updateFixtureInDB = exports.getFixturesFromDB = exports.createFixtureInDB = void 0;
const prisma_1 = require("../../config/prisma");
// =========================
// CREATE FIXTURE + AUTO MATCH
// =========================
const createFixtureInDB = async (data) => {
    return prisma_1.prisma.$transaction(async (tx) => {
        // 1. create fixture
        const fixture = await tx.fixture.create({
            data: {
                tournamentId: data.tournamentId,
                homeTeamId: data.homeTeamId,
                awayTeamId: data.awayTeamId,
                fixtureDate: new Date(data.matchDate),
            },
        });
        console.log("FIXTURE CREATED:", fixture.id);
        // 2. create match (IMPORTANT DEBUG)
        const match = await tx.match.create({
            data: {
                fixtureId: fixture.id,
                homeScore: 0,
                awayScore: 0,
                status: "UPCOMING",
            },
        });
        console.log("MATCH CREATED:", match.id);
        return { fixture, match };
    });
};
exports.createFixtureInDB = createFixtureInDB;
// =========================
// GET ALL FIXTURES
// =========================
const getFixturesFromDB = async () => {
    return prisma_1.prisma.fixture.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            homeTeam: true,
            awayTeam: true,
            tournament: true,
            match: true, // optional but useful
        },
    });
};
exports.getFixturesFromDB = getFixturesFromDB;
// =========================
// UPDATE FIXTURE
// =========================
const updateFixtureInDB = async (id, data) => {
    return prisma_1.prisma.fixture.update({
        where: { id },
        data: {
            tournamentId: data.tournamentId,
            homeTeamId: data.homeTeamId,
            awayTeamId: data.awayTeamId,
            fixtureDate: new Date(data.matchDate),
        },
        include: {
            homeTeam: true,
            awayTeam: true,
            tournament: true,
            match: true,
        },
    });
};
exports.updateFixtureInDB = updateFixtureInDB;
// =========================
// DELETE FIXTURE + MATCH
// =========================
const deleteFixtureInDB = async (id) => {
    return prisma_1.prisma.$transaction(async (tx) => {
        // delete match first (foreign key safe)
        await tx.match.deleteMany({
            where: { fixtureId: id },
        });
        // then delete fixture
        return tx.fixture.delete({
            where: { id },
        });
    });
};
exports.deleteFixtureInDB = deleteFixtureInDB;
