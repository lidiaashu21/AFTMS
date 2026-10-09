import db from "../../config/drizzle";

import { payments } from "../../db/schema/payment";
import { teams } from "../../db/schema/team";

import { and, eq, desc, ne } from "drizzle-orm";

import { CreatePaymentInput } from "./payment.types";

export const createPaymentInDB = async (data: CreatePaymentInput) => {
  const result = await db.insert(payments).values(data).returning();

  return result[0];
};

// Teams currently holding a registration slot for a tournament
// (rejected payments free up the slot).
export const countRegisteredTeamsForTournament = async (
  tournamentId: string,
) => {
  return await db.$count(
    payments,
    and(
      eq(payments.tournamentId, tournamentId),
      ne(payments.status, "REJECTED"),
    ),
  );
};

export const getAllPaymentsFromDB = async () => {
  return await db
    .select({
      id: payments.id,

      teamId: payments.teamId,

      tournamentId: payments.tournamentId,

      teamName: teams.name,

      transactionNumber: payments.transactionNumber,

      amount: payments.amount,

      receiptUrl: payments.receiptUrl,

      status: payments.status,

      createdAt: payments.createdAt,
    })

    .from(payments)

    .leftJoin(teams, eq(payments.teamId, teams.id))

    .orderBy(desc(payments.createdAt));
};

export const getPaymentByIdFromDB = async (id: string) => {
  const result = await db
    .select({
      id: payments.id,

      teamId: payments.teamId,

      tournamentId: payments.tournamentId,

      teamName: teams.name,

      transactionNumber: payments.transactionNumber,

      amount: payments.amount,

      receiptUrl: payments.receiptUrl,

      status: payments.status,

      createdAt: payments.createdAt,
    })

    .from(payments)

    .leftJoin(teams, eq(payments.teamId, teams.id))

    .where(eq(payments.id, id))

    .limit(1);

  return result[0] || null;
};

export const updatePaymentStatusInDB = async (
  id: string,
  status: "PENDING" | "APPROVED" | "REJECTED",
) => {
  const result = await db
    .update(payments)

    .set({
      status,
    })

    .where(eq(payments.id, id))

    .returning();

  return result[0];
};
