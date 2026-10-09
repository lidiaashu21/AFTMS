import { z } from "zod";

export const createPaymentSchema = z.object({
  body: z.object({
    teamId: z.string(),

    tournamentId: z.string(),

    amount: z.number().positive(),

    transactionNumber: z.string().min(3),

    receiptUrl: z.string().optional(),

    method: z.enum(["TELEBIRR", "CASH", "BANK"]),
  }),
});

export const updatePaymentStatusSchema = z.object({
  body: z.object({
    status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
  }),
});
