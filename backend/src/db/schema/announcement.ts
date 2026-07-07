// src/db/schema/announcement.ts

import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const announcements = pgTable("announcements", {
  id: text("id")
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),

  title: text("title").notNull(),

  message: text("message").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
