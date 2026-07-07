import {
  createPaymentInDB,
  getAllPaymentsFromDB,
  getPaymentByIdFromDB,
  updatePaymentStatusInDB,
} from "./payment.repository";

export const createPaymentService = (data: any) => {
  return createPaymentInDB(data);
};

export const getAllPaymentsService = () => {
  return getAllPaymentsFromDB();
};

export const getPaymentByIdService = (id: string) => {
  return getPaymentByIdFromDB(id);
};

export const updatePaymentStatusService = (
  id: string,

  status: "PENDING" | "APPROVED" | "REJECTED",
) => {
  if (!["PENDING", "APPROVED", "REJECTED"].includes(status)) {
    throw new Error("Invalid payment status");
  }

  return updatePaymentStatusInDB(id, status);
};
