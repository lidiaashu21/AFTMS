"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeamByManagerIdFromDB = exports.getTeamByIdFromDB = exports.getAllTeamsFromDB = exports.createTeamInDB = void 0;
const drizzle_1 = __importDefault(require("../../config/drizzle"));
const team_1 = require("../../db/schema/team");
const payment_1 = require("../../db/schema/payment");
const drizzle_orm_1 = require("drizzle-orm");
/* =========================
   CREATE TEAM
========================= */
const createTeamInDB = async (data) => {
    const result = await drizzle_1.default
        .insert(team_1.teams)
        .values({
        name: data.name,
        coachName: data.coachName,
        contactEmail: data.contactEmail,
        // add team owner
        managerId: data.managerId,
    })
        .returning();
    return result[0];
};
exports.createTeamInDB = createTeamInDB;
/* =========================
   GET ALL TEAMS
========================= */
const getAllTeamsFromDB = async () => {
    return await drizzle_1.default
        .select({
        id: team_1.teams.id,
        name: team_1.teams.name,
        coachName: team_1.teams.coachName,
        contactEmail: team_1.teams.contactEmail,
        // return owner
        managerId: team_1.teams.managerId,
        paymentStatus: payment_1.payments.status,
        createdAt: team_1.teams.createdAt,
    })
        .from(team_1.teams)
        .leftJoin(payment_1.payments, (0, drizzle_orm_1.eq)(team_1.teams.id, payment_1.payments.teamId))
        .orderBy((0, drizzle_orm_1.desc)(team_1.teams.createdAt));
};
exports.getAllTeamsFromDB = getAllTeamsFromDB;
/* =========================
   GET TEAM BY ID
========================= */
const getTeamByIdFromDB = async (id) => {
    const result = await drizzle_1.default
        .select({
        id: team_1.teams.id,
        name: team_1.teams.name,
        coachName: team_1.teams.coachName,
        contactEmail: team_1.teams.contactEmail,
        managerId: team_1.teams.managerId,
        paymentStatus: payment_1.payments.status,
        createdAt: team_1.teams.createdAt,
    })
        .from(team_1.teams)
        .leftJoin(payment_1.payments, (0, drizzle_orm_1.eq)(team_1.teams.id, payment_1.payments.teamId))
        .where((0, drizzle_orm_1.eq)(team_1.teams.id, id))
        .limit(1);
    return result[0] ?? null;
};
exports.getTeamByIdFromDB = getTeamByIdFromDB;
/* =========================
   GET TEAM BY MANAGER ID
========================= */
const getTeamByManagerIdFromDB = async (managerId) => {
    const result = await drizzle_1.default
        .select({
        id: team_1.teams.id,
        name: team_1.teams.name,
        coachName: team_1.teams.coachName,
        contactEmail: team_1.teams.contactEmail,
        managerId: team_1.teams.managerId,
        createdAt: team_1.teams.createdAt,
    })
        .from(team_1.teams)
        .where((0, drizzle_orm_1.eq)(team_1.teams.managerId, managerId))
        .limit(1);
    return result[0] ?? null;
};
exports.getTeamByManagerIdFromDB = getTeamByManagerIdFromDB;
