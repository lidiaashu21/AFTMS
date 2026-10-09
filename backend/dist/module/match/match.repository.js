"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMatchInDB = exports.getMatchesFromDB = void 0;
const drizzle_1 = __importDefault(require("../../config/drizzle"));
const match_1 = require("../../db/schema/match");
const fixture_1 = require("../../db/schema/fixture");
const team_1 = require("../../db/schema/team");
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const homeTeam = (0, pg_core_1.alias)(team_1.teams, "homeTeam");
const awayTeam = (0, pg_core_1.alias)(team_1.teams, "awayTeam");
/* =========================
   GET MATCHES (WITH TEAMS)
========================= */
const getMatchesFromDB = async () => {
    const result = await drizzle_1.default
        .select({
        id: match_1.matches.id,
        fixtureId: match_1.matches.fixtureId,
        homeTeam: homeTeam.name,
        awayTeam: awayTeam.name,
        homeScore: match_1.matches.homeScore,
        awayScore: match_1.matches.awayScore,
        status: match_1.matches.status,
        createdAt: match_1.matches.createdAt,
    })
        .from(match_1.matches)
        .leftJoin(fixture_1.fixtures, (0, drizzle_orm_1.eq)(match_1.matches.fixtureId, fixture_1.fixtures.id))
        .leftJoin(homeTeam, (0, drizzle_orm_1.eq)(fixture_1.fixtures.homeTeamId, homeTeam.id))
        .leftJoin(awayTeam, (0, drizzle_orm_1.eq)(fixture_1.fixtures.awayTeamId, awayTeam.id))
        .orderBy((0, drizzle_orm_1.desc)(match_1.matches.createdAt));
    return result;
};
exports.getMatchesFromDB = getMatchesFromDB;
/* =========================
   UPDATE MATCH SCORE + STATUS
========================= */
const updateMatchInDB = async (id, data) => {
    const result = await drizzle_1.default
        .update(match_1.matches)
        .set({
        homeScore: data.homeScore,
        awayScore: data.awayScore,
        status: data.status,
    })
        .where((0, drizzle_orm_1.eq)(match_1.matches.id, id))
        .returning();
    return result[0] || null;
};
exports.updateMatchInDB = updateMatchInDB;
