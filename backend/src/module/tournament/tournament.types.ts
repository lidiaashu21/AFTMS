export interface CreateTournamentInput {
  name: string;
  location: string;
  fee: number;
  maxTeams: number;
  startDate: string; // frontend sends string
  endDate: string;
}

export interface UpdateTournamentInput {
  name?: string;
  location?: string;
  fee?: number;
  maxTeams?: number;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
}
