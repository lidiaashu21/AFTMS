"use strict";
// src/db/schema/tournament.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.tournaments = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.tournaments = (0, pg_core_1.pgTable)("tournaments", {
    id: (0, pg_core_1.text)("id")
        .$defaultFn(() => crypto.randomUUID())
        .primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    location: (0, pg_core_1.text)("location").notNull(),
    startDate: (0, pg_core_1.timestamp)("start_date").notNull(),
    endDate: (0, pg_core_1.timestamp)("end_date").notNull(),
    fee: (0, pg_core_1.integer)("fee").notNull(),
    maxTeams: (0, pg_core_1.integer)("max_teams").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
