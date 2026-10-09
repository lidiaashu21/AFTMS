"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentStatusService = exports.getPaymentByIdService = exports.getAllPaymentsService = exports.createPaymentService = void 0;
const payment_repository_1 = require("./payment.repository");
const team_repository_1 = require("../team/team.repository");
const tournament_repository_1 = require("../tournament/tournament.repository");
const createPaymentService = async (data) => {
    const team = await (0, team_repository_1.getTeamByIdFromDB)(data.teamId);
    if (!team) {
        throw new Error("Team not found");
    }
    const tournament = await (0, tournament_repository_1.getTournamentByIdFromDB)(data.tournamentId);
    if (!tournament) {
        throw new Error("Tournament not found");
    }
    return await (0, payment_repository_1.createPaymentInDB)(data);
};
exports.createPaymentService = createPaymentService;
const getAllPaymentsService = async () => {
    return await (0, payment_repository_1.getAllPaymentsFromDB)();
};
exports.getAllPaymentsService = getAllPaymentsService;
const getPaymentByIdService = async (id) => {
    const payment = await (0, payment_repository_1.getPaymentByIdFromDB)(id);
    if (!payment) {
        throw new Error("Payment not found");
    }
    return payment;
};
exports.getPaymentByIdService = getPaymentByIdService;
const updatePaymentStatusService = async (id, status) => {
    const payment = await (0, payment_repository_1.getPaymentByIdFromDB)(id);
    if (!payment) {
        throw new Error("Payment not found");
    }
    return await (0, payment_repository_1.updatePaymentStatusInDB)(id, status);
};
exports.updatePaymentStatusService = updatePaymentStatusService;
