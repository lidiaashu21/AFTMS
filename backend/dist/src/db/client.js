"use strict";
// src/db/client.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
require("dotenv/config");
const pg_1 = require("pg");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const pool = global.pgPool ??
    new pg_1.Pool({
        connectionString: process.env.DATABASE_URL,
    });
if (process.env.NODE_ENV !== "production") {
    global.pgPool = pool;
}
exports.db = (0, node_postgres_1.drizzle)(pool);
exports.default = exports.db;
