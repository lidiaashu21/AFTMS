import db from "../../config/drizzle";

import { teams } from "../../db/schema/team";
import { tournaments } from "../../db/schema/tournament";
import { fixtures } from "../../db/schema/fixture";
import { matches } from "../../db/schema/match";
import { payments } from "../../db/schema/payment";

import { eq } from "drizzle-orm";

export const getReportsFromDB = async () => {
  const [
    totalTeams,
    totalTournaments,
    totalFixtures,
    totalMatches,
    totalPayments,
    approvedPayments,
    pendingPayments,
    rejectedPayments,
  ] = await Promise.all([
    db.$count(teams),
    db.$count(tournaments),
    db.$count(fixtures),
    db.$count(matches),
    db.$count(payments),

    db.$count(payments, eq(payments.status, "APPROVED")),
    db.$count(payments, eq(payments.status, "PENDING")),
    db.$count(payments, eq(payments.status, "REJECTED")),
  ]);

  return {
    totalTeams,
    totalTournaments,
    totalFixtures,
    totalMatches,
    totalPayments,
    approvedPayments,
    pendingPayments,
    rejectedPayments,
  };
};
