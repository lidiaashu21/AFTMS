export interface Tournament {
  id: string;
  name: string;
  description?: string;

  fee: number;
  maxTeams: number;

  registrationStart: string;
  registrationEnd: string;

  startDate: string;
  endDate: string;

  status: "ACTIVE" | "INACTIVE" | "COMPLETED";

  logo?: string;

  createdAt: string;
  updatedAt?: string;
}

export interface CreateTournamentInput {
  name: string;
  description?: string;
  fee: number;
  maxTeams: number;
  registrationStart: string;
  registrationEnd: string;
  startDate: string;
  endDate: string;
}
