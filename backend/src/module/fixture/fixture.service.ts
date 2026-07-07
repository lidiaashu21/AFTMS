import {
  createFixtureInDB,
  getFixturesFromDB,
  updateFixtureInDB,
  deleteFixtureInDB,
} from "./fixture.repository";

import { CreateFixtureInput, UpdateFixtureInput } from "./fixture.types";

export const createFixtureService = (data: CreateFixtureInput) => {
  return createFixtureInDB(data);
};

export const getFixturesService = () => {
  return getFixturesFromDB();
};

export const updateFixtureService = (
  id: string,

  data: UpdateFixtureInput,
) => {
  return updateFixtureInDB(id, data);
};

export const deleteFixtureService = (id: string) => {
  return deleteFixtureInDB(id);
};
