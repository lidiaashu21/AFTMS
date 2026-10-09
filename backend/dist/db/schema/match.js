"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matches = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const fixture_1 = require("./fixture");
const enums_1 = require("../enums");
exports.matches = (0, pg_core_1.pgTable)("matches", {
    id: (0, pg_core_1.text)("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    fixtureId: (0, pg_core_1.text)("fixture_id")
        .notNull()
        .unique()
        .references(() => fixture_1.fixtures.id, { onDelete: "cascade" }),
    homeScore: (0, pg_core_1.integer)("home_score").default(0).notNull(),
    awayScore: (0, pg_core_1.integer)("away_score").default(0).notNull(),
    status: (0, enums_1.matchStatusEnum)("status").default("UPCOMING").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
