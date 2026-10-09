"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentStatusInDB = exports.getPaymentByIdFromDB = exports.getAllPaymentsFromDB = exports.countRegisteredTeamsForTournament = exports.createPaymentInDB = void 0;
const drizzle_1 = __importDefault(require("../../config/drizzle"));
const payment_1 = require("../../db/schema/payment");
const team_1 = require("../../db/schema/team");
const drizzle_orm_1 = require("drizzle-orm");
const createPaymentInDB = async (data) => {
    const result = await drizzle_1.default.insert(payment_1.payments).values(data).returning();
    return result[0];
};
exports.createPaymentInDB = createPaymentInDB;
// Teams currently holding a registration slot for a tournament
// (rejected payments free up the slot).
const countRegisteredTeamsForTournament = async (tournamentId) => {
    return await drizzle_1.default.$count(payment_1.payments, (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(payment_1.payments.tournamentId, tournamentId), (0, drizzle_orm_1.ne)(payment_1.payments.status, "REJECTED")));
};
exports.countRegisteredTeamsForTournament = countRegisteredTeamsForTournament;
const getAllPaymentsFromDB = async () => {
    return await drizzle_1.default
        .select({
        id: payment_1.payments.id,
        teamId: payment_1.payments.teamId,
        tournamentId: payment_1.payments.tournamentId,
        teamName: team_1.teams.name,
        transactionNumber: payment_1.payments.transactionNumber,
        amount: payment_1.payments.amount,
        receiptUrl: payment_1.payments.receiptUrl,
        status: payment_1.payments.status,
        createdAt: payment_1.payments.createdAt,
    })
        .from(payment_1.payments)
        .leftJoin(team_1.teams, (0, drizzle_orm_1.eq)(payment_1.payments.teamId, team_1.teams.id))
        .orderBy((0, drizzle_orm_1.desc)(payment_1.payments.createdAt));
};
exports.getAllPaymentsFromDB = getAllPaymentsFromDB;
const getPaymentByIdFromDB = async (id) => {
    const result = await drizzle_1.default
        .select({
        id: payment_1.payments.id,
        teamId: payment_1.payments.teamId,
        tournamentId: payment_1.payments.tournamentId,
        teamName: team_1.teams.name,
        transactionNumber: payment_1.payments.transactionNumber,
        amount: payment_1.payments.amount,
        receiptUrl: payment_1.payments.receiptUrl,
        status: payment_1.payments.status,
        createdAt: payment_1.payments.createdAt,
    })
        .from(payment_1.payments)
        .leftJoin(team_1.teams, (0, drizzle_orm_1.eq)(payment_1.payments.teamId, team_1.teams.id))
        .where((0, drizzle_orm_1.eq)(payment_1.payments.id, id))
        .limit(1);
    return result[0] || null;
};
exports.getPaymentByIdFromDB = getPaymentByIdFromDB;
const updatePaymentStatusInDB = async (id, status) => {
    const result = await drizzle_1.default
        .update(payment_1.payments)
        .set({
        status,
    })
        .where((0, drizzle_orm_1.eq)(payment_1.payments.id, id))
        .returning();
    return result[0];
};
exports.updatePaymentStatusInDB = updatePaymentStatusInDB;
