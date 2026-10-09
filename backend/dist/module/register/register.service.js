"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTeamWithPayment = void 0;
const drizzle_1 = __importDefault(require("../../config/drizzle"));
const team_1 = require("../../db/schema/team");
const payment_1 = require("../../db/schema/payment");
const tournament_repository_1 = require("../tournament/tournament.repository");
const payment_repository_1 = require("../payment/payment.repository");
const registerTeamWithPayment = async (data, managerId) => {
    const { teamName, coachName, coachEmail, tournamentId, amount, transactionNumber, } = data;
    if (!teamName || !coachName || !coachEmail) {
        throw new Error("Team data missing");
    }
    if (!tournamentId) {
        throw new Error("Tournament is required");
    }
    if (!amount || !transactionNumber) {
        throw new Error("Payment data missing");
    }
    const numericAmount = Number(amount);
    if (isNaN(numericAmount)) {
        throw new Error("Amount must be a number");
    }
    // =========================
    // 0. ENFORCE TOURNAMENT TEAM LIMIT
    // =========================
    const tournament = await (0, tournament_repository_1.getTournamentByIdFromDB)(tournamentId);
    if (!tournament) {
        throw new Error("Tournament not found");
    }
    const registeredCount = await (0, payment_repository_1.countRegisteredTeamsForTournament)(tournamentId);
    if (registeredCount >= tournament.maxTeams) {
        throw new Error(`Registration closed: this tournament has reached its maximum of ${tournament.maxTeams} teams.`);
    }
    // =========================
    // 1. CREATE TEAM
    // =========================
    const teamResult = await drizzle_1.default
        .insert(team_1.teams)
        .values({
        name: teamName,
        coachName,
        contactEmail: coachEmail,
        managerId,
    })
        .returning();
    const team = teamResult[0];
    // =========================
    // 2. CREATE PAYMENT
    // =========================
    const paymentResult = await drizzle_1.default
        .insert(payment_1.payments)
        .values({
        teamId: team.id,
        tournamentId,
        amount: numericAmount,
        transactionNumber,
    })
        .returning();
    const payment = paymentResult[0];
    return { team, payment };
};
exports.registerTeamWithPayment = registerTeamWithPayment;
