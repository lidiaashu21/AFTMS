export interface CreateTeamInput {
  name: string;
  coachName: string;
  contactEmail: string;
}

export interface Team {
  id: string;
  name: string;
  coachName: string;
  contactEmail: string;
  createdAt: string; // ISO date string from backend
}
