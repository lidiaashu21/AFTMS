"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixtureRelations = exports.teamRelations = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const team_1 = require("./schema/team");
const fixture_1 = require("./schema/fixture");
const tournament_1 = require("./schema/tournament");
const match_1 = require("./schema/match");
const payment_1 = require("./schema/payment");
exports.teamRelations = (0, drizzle_orm_1.relations)(team_1.teams, ({ many }) => ({
    homeFixtures: many(fixture_1.fixtures, {
        relationName: "homeTeam",
    }),
    awayFixtures: many(fixture_1.fixtures, {
        relationName: "awayTeam",
    }),
    payments: many(payment_1.payments),
}));
exports.fixtureRelations = (0, drizzle_orm_1.relations)(fixture_1.fixtures, ({ one }) => ({
    tournament: one(tournament_1.tournaments, {
        fields: [fixture_1.fixtures.tournamentId],
        references: [tournament_1.tournaments.id],
    }),
    homeTeam: one(team_1.teams, {
        fields: [fixture_1.fixtures.homeTeamId],
        references: [team_1.teams.id],
        relationName: "homeTeam",
    }),
    awayTeam: one(team_1.teams, {
        fields: [fixture_1.fixtures.awayTeamId],
        references: [team_1.teams.id],
        relationName: "awayTeam",
    }),
    match: one(match_1.matches),
}));
