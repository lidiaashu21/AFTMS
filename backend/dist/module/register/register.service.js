"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTeamWithPayment = void 0;
const prisma_1 = require("../../config/prisma");
const registerTeamWithPayment = async (data) => {
    const { teamName, coachName, coachEmail, tournamentId, amount, transactionNumber, } = data;
    // 🔥 DEBUG (IMPORTANT)
    console.log("SERVICE DATA:", data);
    // ❌ VALIDATION FIX
    if (!teamName || !coachName || !coachEmail) {
        throw new Error("Team data missing");
    }
    if (!amount || !transactionNumber) {
        throw new Error("Payment data missing");
    }
    // ❗ FIX: ensure number
    const numericAmount = Number(amount);
    if (isNaN(numericAmount)) {
        throw new Error("Amount must be a number");
    }
    // 1. create team
    const team = await prisma_1.prisma.team.create({
        data: {
            name: teamName,
            coachName,
            contactEmail: coachEmail,
        },
    });
    // 2. create payment
    const payment = await prisma_1.prisma.payment.create({
        data: {
            teamId: team.id,
            tournamentId: tournamentId || "DEFAULT_ID",
            amount: numericAmount,
            transactionNumber,
        },
    });
    const all = await prisma_1.prisma.tournament.findMany();
    console.log("ALL TOURNAMENTS:");
    console.log(all);
    return { team, payment };
};
exports.registerTeamWithPayment = registerTeamWithPayment;
