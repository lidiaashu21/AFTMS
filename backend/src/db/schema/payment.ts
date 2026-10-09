// src/db/schema/payment.ts

import { pgTable, real, text, timestamp } from "drizzle-orm/pg-core";

import { teams } from "./team";
import { tournaments } from "./tournament";
import { paymentStatusEnum } from "../enums";

export const payments = pgTable("payments", {
  id: text("id")
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),

  teamId: text("team_id")
    .references(() => teams.id)
    .notNull(),

  tournamentId: text("tournament_id")
    .references(() => tournaments.id, { onDelete: "cascade" })
    .notNull(),

  amount: real("amount").notNull(),

  transactionNumber: text("transaction_number").notNull(),

  receiptUrl: text("receipt_url"),

  status: paymentStatusEnum("status").default("PENDING"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
