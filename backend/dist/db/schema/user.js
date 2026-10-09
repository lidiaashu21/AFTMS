"use strict";
// src/db/schema/user.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const enums_1 = require("../enums");
const crypto_1 = require("crypto");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.text)("id")
        .$defaultFn(() => (0, crypto_1.randomUUID)())
        .primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    email: (0, pg_core_1.text)("email").notNull().unique(),
    password: (0, pg_core_1.text)("password").notNull(),
    role: (0, enums_1.roleEnum)("role").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
