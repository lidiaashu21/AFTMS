import { relations } from "drizzle-orm";

import { teams } from "./schema/team";
import { fixtures } from "./schema/fixture";
import { tournaments } from "./schema/tournament";
import { matches } from "./schema/match";
import { payments } from "./schema/payment";

export const teamRelations = relations(teams, ({ many }) => ({
  homeFixtures: many(fixtures, {
    relationName: "homeTeam",
  }),

  awayFixtures: many(fixtures, {
    relationName: "awayTeam",
  }),

  payments: many(payments),
}));

export const fixtureRelations = relations(fixtures, ({ one }) => ({
  tournament: one(tournaments, {
    fields: [fixtures.tournamentId],
    references: [tournaments.id],
  }),

  homeTeam: one(teams, {
    fields: [fixtures.homeTeamId],
    references: [teams.id],
    relationName: "homeTeam",
  }),

  awayTeam: one(teams, {
    fields: [fixtures.awayTeamId],
    references: [teams.id],
    relationName: "awayTeam",
  }),

  match: one(matches),
}));
