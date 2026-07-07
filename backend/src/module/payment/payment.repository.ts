import db from "../../config/drizzle";

import { payments } from "../../db/schema/payment";
import { teams } from "../../db/schema/team";

import { eq, desc } from "drizzle-orm";
import { CreatePaymentInput } from "./payment.types";

/* =========================
   CREATE PAYMENT
========================= */
export const createPaymentInDB = async (data: CreatePaymentInput) => {
  const result = await db.insert(payments).values(data).returning();

  return result[0];
};

/* =========================
   GET ALL PAYMENTS
========================= */
export const getAllPaymentsFromDB = async () => {
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

    .orderBy(desc(payments.createdAt));

  return result;
};

/* =========================
   GET PAYMENT BY ID
========================= */
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

/* =========================
   UPDATE PAYMENT STATUS
========================= */
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
