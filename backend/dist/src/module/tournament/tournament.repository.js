"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTournamentFromDB = exports.updateTournamentInDB = exports.getTournamentByIdFromDB = exports.getAllTournamentsFromDB = exports.createTournamentInDB = void 0;
const drizzle_1 = __importDefault(require("../../config/drizzle"));
const tournament_1 = require("../../db/schema/tournament");
const drizzle_orm_1 = require("drizzle-orm");
/* =========================
   CREATE TOURNAMENT
========================= */
const createTournamentInDB = async (data) => {
    const result = await drizzle_1.default
        .insert(tournament_1.tournaments)
        .values({
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
    })
        .returning();
    return result[0];
};
exports.createTournamentInDB = createTournamentInDB;
/* =========================
   GET ALL TOURNAMENTS
========================= */
const getAllTournamentsFromDB = async () => {
    return await drizzle_1.default
        .select()
        .from(tournament_1.tournaments)
        .orderBy((0, drizzle_orm_1.desc)(tournament_1.tournaments.createdAt));
};
exports.getAllTournamentsFromDB = getAllTournamentsFromDB;
/* =========================
   GET TOURNAMENT BY ID
========================= */
const getTournamentByIdFromDB = async (id) => {
    const result = await drizzle_1.default
        .select()
        .from(tournament_1.tournaments)
        .where((0, drizzle_orm_1.eq)(tournament_1.tournaments.id, id))
        .limit(1);
    return result[0] || null;
};
exports.getTournamentByIdFromDB = getTournamentByIdFromDB;
/* =========================
   UPDATE TOURNAMENT
========================= */
const updateTournamentInDB = async (id, data) => {
    const updatedData = { ...data };
    if (data.startDate) {
        updatedData.startDate = new Date(data.startDate);
    }
    if (data.endDate) {
        updatedData.endDate = new Date(data.endDate);
    }
    const result = await drizzle_1.default
        .update(tournament_1.tournaments)
        .set(updatedData)
        .where((0, drizzle_orm_1.eq)(tournament_1.tournaments.id, id))
        .returning();
    return result[0];
};
exports.updateTournamentInDB = updateTournamentInDB;
/* =========================
   DELETE TOURNAMENT
========================= */
const deleteTournamentFromDB = async (id) => {
    const result = await drizzle_1.default
        .delete(tournament_1.tournaments)
        .where((0, drizzle_orm_1.eq)(tournament_1.tournaments.id, id))
        .returning();
    return result[0];
};
exports.deleteTournamentFromDB = deleteTournamentFromDB;
