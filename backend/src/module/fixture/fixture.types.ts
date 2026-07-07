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
