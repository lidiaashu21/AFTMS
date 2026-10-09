import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as userSchema from "../db/schema/user";
import * as teamSchema from "../db/schema/team";
import * as tournamentSchema from "../db/schema/tournament";
import * as fixtureSchema from "../db/schema/fixture";
import * as matchSchema from "../db/schema/match";
import * as paymentSchema from "../db/schema/payment";
import * as announcementSchema from "../db/schema/announcement";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, {
  schema: {
    ...userSchema,
    ...teamSchema,
    ...tournamentSchema,
    ...fixtureSchema,
    ...matchSchema,
    ...paymentSchema,
    ...announcementSchema,
  },
});

export default db;
