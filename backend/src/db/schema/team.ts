// src/db/schema/team.ts

import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { users } from "./user";

export const teams = pgTable("teams", {
  id: text("id")
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),

  // The user who created this team
  managerId: text("manager_id")
    .notNull()
    .references(() => users.id),

  name: text("name").notNull(),

  coachName: text("coach_name").notNull(),

  contactEmail: text("contact_email").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
