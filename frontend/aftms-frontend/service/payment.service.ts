import api from "./api";

export interface Payment {
  id: string;
  teamId: string;
  amount: number;
  transactionNumber: string;
  receiptUrl?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
}

export interface CreatePaymentInput {
  teamId: string;
  amount: number;
  transactionNumber: string;
  receiptUrl?: string;
}

export const getPayments = async (): Promise<Payment[]> => {
  const res = await api.get("/payments");
  return res.data;
};

export const createPayment = async (
  data: CreatePaymentInput,
): Promise<Payment> => {
  const res = await api.post("/payments", data);
  return res.data;
};

export const updatePaymentStatus = async (
  id: string,
  status: Payment["status"],
): Promise<Payment> => {
  const res = await api.patch(`/payments/${id}`, { status });
  return res.data;
};
