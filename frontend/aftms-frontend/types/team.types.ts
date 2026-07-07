export interface Team {
  id: string;
  teamName: string;
  teamLogo?: string;
  address?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  updatedAt?: string;
}

export interface CreateTeamInput {
  teamName: string;
  teamLogo?: string;
  address?: string;
}
