"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFixtureInDB = exports.updateFixtureInDB = exports.getFixtureByIdFromDB = exports.getFixturesFromDB = exports.createFixtureInDB = void 0;
const drizzle_1 = __importDefault(require("../../config/drizzle"));
const fixture_1 = require("../../db/schema/fixture");
const match_1 = require("../../db/schema/match");
const drizzle_orm_1 = require("drizzle-orm");
/* ============================================================================
   CREATE FIXTURE + MATCH
============================================================================ */
const createFixtureInDB = async (data) => {
    return await drizzle_1.default.transaction(async (tx) => {
        if (data.homeTeamId === data.awayTeamId) {
            throw new Error("Home team and away team cannot be the same.");
        }
        const fixtureDate = new Date(data.matchDate);
        if (isNaN(fixtureDate.getTime())) {
            throw new Error("Invalid match date.");
        }
        const insertedFixture = await tx
            .insert(fixture_1.fixtures)
            .values({
            tournamentId: data.tournamentId,
            homeTeamId: data.homeTeamId,
            awayTeamId: data.awayTeamId,
            fixtureDate,
        })
            .returning();
        const fixture = insertedFixture[0];
        if (!fixture) {
            throw new Error("Failed to create fixture.");
        }
        const insertedMatch = await tx
            .insert(match_1.matches)
            .values({
            fixtureId: fixture.id,
            homeScore: 0,
            awayScore: 0,
            status: "UPCOMING",
        })
            .returning();
        const match = insertedMatch[0];
        const fullFixture = await tx.query.fixtures.findFirst({
            where: (0, drizzle_orm_1.eq)(fixture_1.fixtures.id, fixture.id),
            with: {
                tournament: true,
                homeTeam: true,
                awayTeam: true,
            },
        });
        return {
            fixture: fullFixture,
            match,
        };
    });
};
exports.createFixtureInDB = createFixtureInDB;
/* ============================================================================
   GET ALL FIXTURES
============================================================================ */
const getFixturesFromDB = async () => {
    return await drizzle_1.default.query.fixtures.findMany({
        with: {
            tournament: true,
            homeTeam: true,
            awayTeam: true,
        },
        orderBy: (fixtures, { desc }) => [desc(fixtures.fixtureDate)],
    });
};
exports.getFixturesFromDB = getFixturesFromDB;
/* ============================================================================
   GET ONE FIXTURE
============================================================================ */
const getFixtureByIdFromDB = async (id) => {
    return await drizzle_1.default.query.fixtures.findFirst({
        where: (0, drizzle_orm_1.eq)(fixture_1.fixtures.id, id),
        with: {
            tournament: true,
            homeTeam: true,
            awayTeam: true,
        },
    });
};
exports.getFixtureByIdFromDB = getFixtureByIdFromDB;
/* ============================================================================
   UPDATE FIXTURE
============================================================================ */
const updateFixtureInDB = async (id, data) => {
    const updateData = {};
    if (data.homeTeamId &&
        data.awayTeamId &&
        data.homeTeamId === data.awayTeamId) {
        throw new Error("Home team and away team cannot be the same.");
    }
    if (data.tournamentId) {
        updateData.tournamentId = data.tournamentId;
    }
    if (data.homeTeamId) {
        updateData.homeTeamId = data.homeTeamId;
    }
    if (data.awayTeamId) {
        updateData.awayTeamId = data.awayTeamId;
    }
    if (data.matchDate) {
        const fixtureDate = new Date(data.matchDate);
        if (isNaN(fixtureDate.getTime())) {
            throw new Error("Invalid match date.");
        }
        updateData.fixtureDate = fixtureDate;
    }
    const updated = await drizzle_1.default
        .update(fixture_1.fixtures)
        .set(updateData)
        .where((0, drizzle_orm_1.eq)(fixture_1.fixtures.id, id))
        .returning();
    if (!updated.length) {
        throw new Error("Fixture not found.");
    }
    const fixture = await drizzle_1.default.query.fixtures.findFirst({
        where: (0, drizzle_orm_1.eq)(fixture_1.fixtures.id, id),
        with: {
            tournament: true,
            homeTeam: true,
            awayTeam: true,
        },
    });
    return fixture;
};
exports.updateFixtureInDB = updateFixtureInDB;
/* ============================================================================
   DELETE FIXTURE
============================================================================ */
const deleteFixtureInDB = async (id) => {
    return await drizzle_1.default.transaction(async (tx) => {
        await tx.delete(match_1.matches).where((0, drizzle_orm_1.eq)(match_1.matches.fixtureId, id));
        const deleted = await tx
            .delete(fixture_1.fixtures)
            .where((0, drizzle_orm_1.eq)(fixture_1.fixtures.id, id))
            .returning();
        if (!deleted.length) {
            throw new Error("Fixture not found.");
        }
        return deleted[0];
    });
};
exports.deleteFixtureInDB = deleteFixtureInDB;
