import {
  createFixtureInDB,
  getFixturesFromDB,
  updateFixtureInDB,
  deleteFixtureInDB,
} from "./fixture.repository";

import { CreateFixtureInput, UpdateFixtureInput } from "./fixture.types";

/*
==================================================
CREATE FIXTURE SERVICE
==================================================
*/

export const createFixtureService = async (data: CreateFixtureInput) => {
  if (!data.homeTeamId || !data.awayTeamId) {
    throw new Error("Home team and away team are required.");
  }

  if (data.homeTeamId === data.awayTeamId) {
    throw new Error("Home team and away team cannot be the same.");
  }

  return await createFixtureInDB(data);
};

/*
==================================================
GET ALL FIXTURES SERVICE
==================================================
*/

export const getFixturesService = async () => {
  return await getFixturesFromDB();
};

/*
==================================================
UPDATE FIXTURE SERVICE
==================================================
*/

export const updateFixtureService = async (
  id: string,

  data: UpdateFixtureInput,
) => {
  if (!id) {
    throw new Error("Fixture id is required.");
  }

  if (
    data.homeTeamId &&
    data.awayTeamId &&
    data.homeTeamId === data.awayTeamId
  ) {
    throw new Error("Home team and away team cannot be the same.");
  }

  return await updateFixtureInDB(id, data);
};

/*
==================================================
DELETE FIXTURE SERVICE
==================================================
*/

export const deleteFixtureService = async (id: string) => {
  if (!id) {
    throw new Error("Fixture id is required.");
  }

  return await deleteFixtureInDB(id);
};
