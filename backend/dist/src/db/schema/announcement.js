"use strict";
// src/db/schema/announcement.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.announcements = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.announcements = (0, pg_core_1.pgTable)("announcements", {
    id: (0, pg_core_1.text)("id")
        .$defaultFn(() => crypto.randomUUID())
        .primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    message: (0, pg_core_1.text)("message").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
