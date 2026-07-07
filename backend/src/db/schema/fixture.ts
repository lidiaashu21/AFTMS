import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";

import { teams } from "./team";
import { tournaments } from "./tournament";

export const fixtures = pgTable("fixtures", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  tournamentId: text("tournament_id")
    .notNull()
    .references(() => tournaments.id),

  homeTeamId: text("home_team_id")
    .notNull()
    .references(() => teams.id),

  awayTeamId: text("away_team_id")
    .notNull()
    .references(() => teams.id),

  fixtureDate: timestamp("fixture_date").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const fixturesRelations = relations(fixtures, ({ one }) => ({
  homeTeam: one(teams, {
    fields: [fixtures.homeTeamId],
    references: [teams.id],
  }),

  awayTeam: one(teams, {
    fields: [fixtures.awayTeamId],
    references: [teams.id],
  }),

  tournament: one(tournaments, {
    fields: [fixtures.tournamentId],
    references: [tournaments.id],
  }),
}));
