import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { fixtures } from "./fixture";
import { matchStatusEnum } from "../enums";

export const matches = pgTable("matches", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  fixtureId: text("fixture_id")
    .notNull()
    .unique()
    .references(() => fixtures.id),

  homeScore: integer("home_score").default(0).notNull(),

  awayScore: integer("away_score").default(0).notNull(),

  status: matchStatusEnum("status").default("UPCOMING").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
