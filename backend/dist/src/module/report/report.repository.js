"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReportsFromDB = void 0;
const drizzle_1 = __importDefault(require("../../config/drizzle"));
const team_1 = require("../../db/schema/team");
const tournament_1 = require("../../db/schema/tournament");
const fixture_1 = require("../../db/schema/fixture");
const match_1 = require("../../db/schema/match");
const payment_1 = require("../../db/schema/payment");
const drizzle_orm_1 = require("drizzle-orm");
const getReportsFromDB = async () => {
    const [totalTeams, totalTournaments, totalFixtures, totalMatches, totalPayments, approvedPayments, pendingPayments, rejectedPayments,] = await Promise.all([
        drizzle_1.default.$count(team_1.teams),
        drizzle_1.default.$count(tournament_1.tournaments),
        drizzle_1.default.$count(fixture_1.fixtures),
        drizzle_1.default.$count(match_1.matches),
        drizzle_1.default.$count(payment_1.payments),
        drizzle_1.default.$count(payment_1.payments, (0, drizzle_orm_1.eq)(payment_1.payments.status, "APPROVED")),
        drizzle_1.default.$count(payment_1.payments, (0, drizzle_orm_1.eq)(payment_1.payments.status, "PENDING")),
        drizzle_1.default.$count(payment_1.payments, (0, drizzle_orm_1.eq)(payment_1.payments.status, "REJECTED")),
    ]);
    return {
        totalTeams,
        totalTournaments,
        totalFixtures,
        totalMatches,
        totalPayments,
        approvedPayments,
        pendingPayments,
        rejectedPayments,
    };
};
exports.getReportsFromDB = getReportsFromDB;
