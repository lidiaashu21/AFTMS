import db from "../../config/drizzle";

import { teams } from "../../db/schema/team";
import { payments } from "../../db/schema/payment";
import { tournaments } from "../../db/schema/tournament";

export const registerTeamWithPayment = async (data: any) => {
  const {
    teamName,
    coachName,
    coachEmail,
    tournamentId,
    amount,
    transactionNumber,
  } = data;

  // 🔥 DEBUG
  console.log("SERVICE DATA:", data);

  // ❌ VALIDATION
  if (!teamName || !coachName || !coachEmail) {
    throw new Error("Team data missing");
  }

  if (!amount || !transactionNumber) {
    throw new Error("Payment data missing");
  }

  const numericAmount = Number(amount);

  if (isNaN(numericAmount)) {
    throw new Error("Amount must be a number");
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
      tournamentId: tournamentId || "DEFAULT_ID",
      amount: numericAmount,
      transactionNumber,
    })
    .returning();

  const payment = paymentResult[0];

  // =========================
  // 3. DEBUG: GET ALL TOURNAMENTS
  // =========================
  const allTournaments = await db.select().from(tournaments);

  console.log("ALL TOURNAMENTS:");
  console.log(allTournaments);

  return { team, payment };
};
