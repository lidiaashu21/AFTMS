// src/db/client.ts

import "dotenv/config";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

declare global {
  var pgPool: Pool | undefined;
}

const pool =
  global.pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== "production") {
  global.pgPool = pool;
}

export const db = drizzle(pool);

export default db;
