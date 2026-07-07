"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTournamentService = exports.updateTournamentService = exports.getTournamentByIdService = exports.getAllTournamentsService = exports.createTournamentService = void 0;
const tournament_repository_1 = require("./tournament.repository");
// ✅ CREATE TOURNAMENT
const createTournamentService = async (data) => {
    // 1. Validate dates
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error("Invalid startDate or endDate");
    }
    if (end < start) {
        throw new Error("End date cannot be earlier than start date");
    }
    // 2. Send to DB (converted to Date)
    return await (0, tournament_repository_1.createTournamentInDB)({
        ...data,
        startDate: start,
        endDate: end,
    });
};
exports.createTournamentService = createTournamentService;
// ✅ GET ALL TOURNAMENTS
const getAllTournamentsService = async () => {
    return await (0, tournament_repository_1.getAllTournamentsFromDB)();
};
exports.getAllTournamentsService = getAllTournamentsService;
// ✅ GET ONE TOURNAMENT
const getTournamentByIdService = async (id) => {
    const tournament = await (0, tournament_repository_1.getTournamentByIdFromDB)(id);
    if (!tournament) {
        throw new Error("Tournament not found");
    }
    return tournament;
};
exports.getTournamentByIdService = getTournamentByIdService;
// ✅ UPDATE TOURNAMENT
const updateTournamentService = async (id, data) => {
    const updatedData = { ...data };
    // convert dates only if they exist
    if (data.startDate) {
        const start = new Date(data.startDate);
        if (isNaN(start.getTime()))
            throw new Error("Invalid startDate");
        updatedData.startDate = start;
    }
    if (data.endDate) {
        const end = new Date(data.endDate);
        if (isNaN(end.getTime()))
            throw new Error("Invalid endDate");
        updatedData.endDate = end;
    }
    // validate range if both exist
    if (updatedData.startDate && updatedData.endDate) {
        if (updatedData.endDate < updatedData.startDate) {
            throw new Error("End date cannot be earlier than start date");
        }
    }
    return await (0, tournament_repository_1.updateTournamentInDB)(id, updatedData);
};
exports.updateTournamentService = updateTournamentService;
// ✅ DELETE TOURNAMENT
const deleteTournamentService = async (id) => {
    return await (0, tournament_repository_1.deleteTournamentFromDB)(id);
};
exports.deleteTournamentService = deleteTournamentService;
