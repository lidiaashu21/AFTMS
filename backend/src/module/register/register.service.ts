import db from "../../config/drizzle";

import { teams } from "../../db/schema/team";
import { payments } from "../../db/schema/payment";

import { getTournamentByIdFromDB } from "../tournament/tournament.repository";
import { countRegisteredTeamsForTournament } from "../payment/payment.repository";

export const registerTeamWithPayment = async (data: any, managerId: string) => {
  const {
    teamName,
    coachName,
    coachEmail,
    tournamentId,
    amount,
    transactionNumber,
  } = data;

  if (!teamName || !coachName || !coachEmail) {
    throw new Error("Team data missing");
  }

  if (!tournamentId) {
    throw new Error("Tournament is required");
  }

  if (!amount || !transactionNumber) {
    throw new Error("Payment data missing");
  }

  const numericAmount = Number(amount);

  if (isNaN(numericAmount)) {
    throw new Error("Amount must be a number");
  }

  // =========================
  // 0. ENFORCE TOURNAMENT TEAM LIMIT
  // =========================
  const tournament = await getTournamentByIdFromDB(tournamentId);

  if (!tournament) {
    throw new Error("Tournament not found");
  }

  const registeredCount = await countRegisteredTeamsForTournament(tournamentId);

  if (registeredCount >= tournament.maxTeams) {
    throw new Error(
      `Registration closed: this tournament has reached its maximum of ${tournament.maxTeams} teams.`,
    );
  }

  // =========================
  // 1. CREATE TEAM
  // =========================
  const teamResult = await db
    .insert(teams)
    .values({
      name: teamName,
      coachName,
      contactEmail: coachEmail,
      managerId,
    })
    .returning();

  const team = teamResult[0];

  // =========================
  // 2. CREATE PAYMENT
  // =========================
  const paymentResult = await db
    .insert(payments)
    .values({
      teamId: team.id,
      tournamentId,
      amount: numericAmount,
      transactionNumber,
    })
    .returning();

  const payment = paymentResult[0];

  return { team, payment };
};
