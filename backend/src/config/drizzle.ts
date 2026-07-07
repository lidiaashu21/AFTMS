import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as fixtureSchema from "../db/schema/fixture";
import * as teamSchema from "../db/schema/team";
import * as tournamentSchema from "../db/schema/tournament";
import * as matchSchema from "../db/schema/match";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, {
  schema: {
    ...fixtureSchema,
    ...teamSchema,
    ...tournamentSchema,
    ...matchSchema,
  },
});

export default db;
