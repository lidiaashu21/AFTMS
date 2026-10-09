import api from "./api";

export interface Team {
  id: string;
  name: string;
}

export interface Tournament {
  id: string;
  name: string;
  location?: string;
}

export interface Fixture {
  id: string;

  homeTeam: Team;
  awayTeam: Team;

  matchDate: string;

  status: "UPCOMING" | "ONGOING" | "COMPLETED";

  tournament?: Tournament;
}

export interface CreateFixtureInput {
  tournamentId: string;
  homeTeamId: string;
  awayTeamId: string;
  matchDate: string;
}

export interface UpdateFixtureInput {
  tournamentId?: string;
  homeTeamId?: string;
  awayTeamId?: string;
  matchDate?: string;
}

export const getFixtures = async (): Promise<Fixture[]> => {
  const res = await api.get("/fixtures");
  const raw = res.data?.data || [];

  return raw.map((f: any) => ({
    ...f,
    matchDate: f.fixtureDate || f.matchDate,
    status: f.status || "UPCOMING",
  }));
};

export const createFixture = async (
  data: CreateFixtureInput,
): Promise<Fixture> => {
  const res = await api.post("/fixtures", data);
  return res.data;
};
