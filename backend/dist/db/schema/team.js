"use strict";
// src/db/schema/team.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.teams = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const user_1 = require("./user");
exports.teams = (0, pg_core_1.pgTable)("teams", {
    id: (0, pg_core_1.text)("id")
        .$defaultFn(() => crypto.randomUUID())
        .primaryKey(),
    // The user who created this team
    managerId: (0, pg_core_1.text)("manager_id")
        .notNull()
        .references(() => user_1.users.id),
    name: (0, pg_core_1.text)("name").notNull(),
    coachName: (0, pg_core_1.text)("coach_name").notNull(),
    contactEmail: (0, pg_core_1.text)("contact_email").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
