"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTeamWithPayment = void 0;
const drizzle_1 = __importDefault(require("../../config/drizzle"));
const team_1 = require("../../db/schema/team");
const payment_1 = require("../../db/schema/payment");
const tournament_1 = require("../../db/schema/tournament");
const registerTeamWithPayment = async (data) => {
    const { teamName, coachName, coachEmail, tournamentId, amount, transactionNumber, } = data;
    // 🔥 DEBUG
    console.log("SERVICE DATA:", data);
    // ❌ VALIDATION
    if (!teamName || !coachName || !coachEmail) {
        throw new Error("Team data missing");
    }
    if (!amount || !transactionNumber) {
        throw new Error("Payment data missing");
    }
    const numericAmount = Number(amount);
    if (isNaN(numericAmount)) {
        throw new Error("Amount must be a number");
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
        tournamentId: tournamentId || "DEFAULT_ID",
        amount: numericAmount,
        transactionNumber,
    })
        .returning();
    const payment = paymentResult[0];
    // =========================
    // 3. DEBUG: GET ALL TOURNAMENTS
    // =========================
    const allTournaments = await drizzle_1.default.select().from(tournament_1.tournaments);
    console.log("ALL TOURNAMENTS:");
    console.log(allTournaments);
    return { team, payment };
};
exports.registerTeamWithPayment = registerTeamWithPayment;
