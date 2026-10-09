"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixturesRelations = exports.fixtures = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
const team_1 = require("./team");
const tournament_1 = require("./tournament");
exports.fixtures = (0, pg_core_1.pgTable)("fixtures", {
    id: (0, pg_core_1.text)("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    tournamentId: (0, pg_core_1.text)("tournament_id")
        .notNull()
        .references(() => tournament_1.tournaments.id),
    homeTeamId: (0, pg_core_1.text)("home_team_id")
        .notNull()
        .references(() => team_1.teams.id),
    awayTeamId: (0, pg_core_1.text)("away_team_id")
        .notNull()
        .references(() => team_1.teams.id),
    fixtureDate: (0, pg_core_1.timestamp)("fixture_date").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
exports.fixturesRelations = (0, drizzle_orm_1.relations)(exports.fixtures, ({ one }) => ({
    homeTeam: one(team_1.teams, {
        fields: [exports.fixtures.homeTeamId],
        references: [team_1.teams.id],
    }),
    awayTeam: one(team_1.teams, {
        fields: [exports.fixtures.awayTeamId],
        references: [team_1.teams.id],
    }),
    tournament: one(tournament_1.tournaments, {
        fields: [exports.fixtures.tournamentId],
        references: [tournament_1.tournaments.id],
    }),
}));
