// src/db/schema/tournament.ts

import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const tournaments = pgTable("tournaments", {
  id: text("id")
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),

  name: text("name").notNull(),

  location: text("location").notNull(),

  startDate: timestamp("start_date").notNull(),

  endDate: timestamp("end_date").notNull(),

  fee: integer("fee").notNull(),

  maxTeams: integer("max_teams").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
