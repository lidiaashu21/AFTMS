import {
  createPaymentInDB,
  getAllPaymentsFromDB,
  getPaymentByIdFromDB,
  updatePaymentStatusInDB,
} from "./payment.repository";

import { getTeamByIdFromDB } from "../team/team.repository";
import { getTournamentByIdFromDB } from "../tournament/tournament.repository";

import { CreatePaymentInput, PaymentStatus } from "./payment.types";

export const createPaymentService = async (data: CreatePaymentInput) => {
  const team = await getTeamByIdFromDB(data.teamId);

  if (!team) {
    throw new Error("Team not found");
  }

  const tournament = await getTournamentByIdFromDB(data.tournamentId);

  if (!tournament) {
    throw new Error("Tournament not found");
  }

  return await createPaymentInDB(data);
};

export const getAllPaymentsService = async () => {
  return await getAllPaymentsFromDB();
};

export const getPaymentByIdService = async (id: string) => {
  const payment = await getPaymentByIdFromDB(id);

  if (!payment) {
    throw new Error("Payment not found");
  }

  return payment;
};

export const updatePaymentStatusService = async (
  id: string,
  status: PaymentStatus,
) => {
  const payment = await getPaymentByIdFromDB(id);

  if (!payment) {
    throw new Error("Payment not found");
  }

  return await updatePaymentStatusInDB(id, status);
};
