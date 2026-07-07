import api from "./api";

export interface Fixture {
  id: string;
  homeTeam: string;
  awayTeam: string;
  matchDate: string;
  venue: string;
  status: "UPCOMING" | "ONGOING" | "COMPLETED";
  homeScore?: number;
  awayScore?: number;
}

export interface CreateFixtureInput {
  homeTeam: string;
  awayTeam: string;
  matchDate: string;
  venue: string;
}

export const getFixtures = async (): Promise<Fixture[]> => {
  const res = await api.get("/fixtures");
  return res.data;
};

export const createFixture = async (
  data: CreateFixtureInput,
): Promise<Fixture> => {
  const res = await api.post("/fixtures", data);
  return res.data;
};
