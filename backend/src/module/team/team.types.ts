// src/module/team/team.types.ts

export type PaymentStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface CreateTeamInput {
  name: string;

  coachName: string;

  contactEmail: string;

  // user who creates the team
  managerId: string;
}

export interface Team {
  id: string;

  // team owner
  managerId: string;

  name: string;

  coachName: string;

  contactEmail: string;

  paymentStatus: PaymentStatus | null;

  createdAt: Date;
}
