export interface CreatePaymentInput {
  teamId: string;
  tournamentId: string;
  amount: number;
  transactionNumber: string; // add this
  receiptUrl?: string;
  method: "TELEBIRR" | "CASH" | "BANK";
}

export interface UpdatePaymentStatusInput {
  status: "PENDING" | "APPROVED" | "REJECTED";
}
