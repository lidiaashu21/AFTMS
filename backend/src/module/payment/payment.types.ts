export type PaymentStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface CreatePaymentInput {
  teamId: string;
  tournamentId: string;
  amount: number;
  transactionNumber: string;
  receiptUrl?: string;
  method: "TELEBIRR" | "CASH" | "BANK";
}

export interface UpdatePaymentStatusInput {
  status: PaymentStatus;
}
