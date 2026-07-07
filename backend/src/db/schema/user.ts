// src/db/schema/user.ts

import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { roleEnum } from "../enums";

export const users = pgTable("users", {
  id: text("id")
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),

  name: text("name").notNull(),

  email: text("email").notNull().unique(),

  password: text("password").notNull(),

  role: roleEnum("role").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
