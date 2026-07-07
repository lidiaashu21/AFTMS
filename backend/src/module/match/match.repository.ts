import db from "../../config/drizzle";

import { matches } from "../../db/schema/match";
import { fixtures } from "../../db/schema/fixture";
import { teams } from "../../db/schema/team";

import { eq, desc } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";

const homeTeam = alias(teams, "homeTeam");
const awayTeam = alias(teams, "awayTeam");

/* =========================
   GET MATCHES (WITH TEAMS)
========================= */
export const getMatchesFromDB = async () => {
  const result = await db
    .select({
      id: matches.id,

      fixtureId: matches.fixtureId,

      homeTeam: homeTeam.name,

      awayTeam: awayTeam.name,

      homeScore: matches.homeScore,

      awayScore: matches.awayScore,

      status: matches.status,

      createdAt: matches.createdAt,
    })

    .from(matches)

    .leftJoin(fixtures, eq(matches.fixtureId, fixtures.id))

    .leftJoin(homeTeam, eq(fixtures.homeTeamId, homeTeam.id))

    .leftJoin(awayTeam, eq(fixtures.awayTeamId, awayTeam.id))

    .orderBy(desc(matches.createdAt));

  return result;
};

/* =========================
   UPDATE MATCH SCORE + STATUS
========================= */
export const updateMatchInDB = async (
  id: string,
  data: {
    homeScore: number;
    awayScore: number;
    status: "UPCOMING" | "ONGOING" | "COMPLETED";
  },
) => {
  const result = await db

    .update(matches)

    .set({
      homeScore: data.homeScore,

      awayScore: data.awayScore,

      status: data.status,
    })

    .where(eq(matches.id, id))

    .returning();

  return result[0] || null;
};
