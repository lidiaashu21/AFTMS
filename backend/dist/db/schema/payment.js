"use strict";
// src/db/schema/payment.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.payments = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const team_1 = require("./team");
const tournament_1 = require("./tournament");
const enums_1 = require("../enums");
exports.payments = (0, pg_core_1.pgTable)("payments", {
    id: (0, pg_core_1.text)("id")
        .$defaultFn(() => crypto.randomUUID())
        .primaryKey(),
    teamId: (0, pg_core_1.text)("team_id")
        .references(() => team_1.teams.id)
        .notNull(),
    tournamentId: (0, pg_core_1.text)("tournament_id")
        .references(() => tournament_1.tournaments.id, { onDelete: "cascade" })
        .notNull(),
    amount: (0, pg_core_1.real)("amount").notNull(),
    transactionNumber: (0, pg_core_1.text)("transaction_number").notNull(),
    receiptUrl: (0, pg_core_1.text)("receipt_url"),
    status: (0, enums_1.paymentStatusEnum)("status").default("PENDING"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
