import db from "../../config/drizzle";

import { fixtures } from "../../db/schema/fixture";
import { matches } from "../../db/schema/match";

import { eq } from "drizzle-orm";

import { CreateFixtureInput, UpdateFixtureInput } from "./fixture.types";

/* ============================================================================
   CREATE FIXTURE + MATCH
============================================================================ */

export const createFixtureInDB = async (data: CreateFixtureInput) => {
  return await db.transaction(async (tx) => {
    if (data.homeTeamId === data.awayTeamId) {
      throw new Error("Home team and away team cannot be the same.");
    }

    const fixtureDate = new Date(data.matchDate);

    if (isNaN(fixtureDate.getTime())) {
      throw new Error("Invalid match date.");
    }

    const insertedFixture = await tx
      .insert(fixtures)
      .values({
        tournamentId: data.tournamentId,
        homeTeamId: data.homeTeamId,
        awayTeamId: data.awayTeamId,
        fixtureDate,
      })
      .returning();

    const fixture = insertedFixture[0];

    if (!fixture) {
      throw new Error("Failed to create fixture.");
    }

    const insertedMatch = await tx
      .insert(matches)
      .values({
        fixtureId: fixture.id,
        homeScore: 0,
        awayScore: 0,
        status: "UPCOMING",
      })
      .returning();

    const match = insertedMatch[0];

    const fullFixture = await tx.query.fixtures.findFirst({
      where: eq(fixtures.id, fixture.id),
      with: {
        tournament: true,
        homeTeam: true,
        awayTeam: true,
      },
    });

    return {
      fixture: fullFixture,
      match,
    };
  });
};

/* ============================================================================
   GET ALL FIXTURES
============================================================================ */

export const getFixturesFromDB = async () => {
  return await db.query.fixtures.findMany({
    with: {
      tournament: true,
      homeTeam: true,
      awayTeam: true,
    },
    orderBy: (fixtures, { desc }) => [desc(fixtures.fixtureDate)],
  });
};

/* ============================================================================
   GET ONE FIXTURE
============================================================================ */

export const getFixtureByIdFromDB = async (id: string) => {
  return await db.query.fixtures.findFirst({
    where: eq(fixtures.id, id),
    with: {
      tournament: true,
      homeTeam: true,
      awayTeam: true,
    },
  });
};

/* ============================================================================
   UPDATE FIXTURE
============================================================================ */

export const updateFixtureInDB = async (
  id: string,
  data: UpdateFixtureInput,
) => {
  const updateData: any = {};

  if (
    data.homeTeamId &&
    data.awayTeamId &&
    data.homeTeamId === data.awayTeamId
  ) {
    throw new Error("Home team and away team cannot be the same.");
  }

  if (data.tournamentId) {
    updateData.tournamentId = data.tournamentId;
  }

  if (data.homeTeamId) {
    updateData.homeTeamId = data.homeTeamId;
  }

  if (data.awayTeamId) {
    updateData.awayTeamId = data.awayTeamId;
  }

  if (data.matchDate) {
    const fixtureDate = new Date(data.matchDate);

    if (isNaN(fixtureDate.getTime())) {
      throw new Error("Invalid match date.");
    }

    updateData.fixtureDate = fixtureDate;
  }

  const updated = await db
    .update(fixtures)
    .set(updateData)
    .where(eq(fixtures.id, id))
    .returning();

  if (!updated.length) {
    throw new Error("Fixture not found.");
  }

  const fixture = await db.query.fixtures.findFirst({
    where: eq(fixtures.id, id),
    with: {
      tournament: true,
      homeTeam: true,
      awayTeam: true,
    },
  });

  return fixture;
};

/* ============================================================================
   DELETE FIXTURE
============================================================================ */

export const deleteFixtureInDB = async (id: string) => {
  return await db.transaction(async (tx) => {
    await tx.delete(matches).where(eq(matches.fixtureId, id));

    const deleted = await tx
      .delete(fixtures)
      .where(eq(fixtures.id, id))
      .returning();

    if (!deleted.length) {
      throw new Error("Fixture not found.");
    }

    return deleted[0];
  });
};
