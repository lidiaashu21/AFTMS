"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTournamentController = exports.updateTournamentController = exports.getTournamentByIdController = exports.getAllTournamentsController = exports.createTournamentController = void 0;
const tournament_service_1 = require("./tournament.service");
// ✅ CREATE
const createTournamentController = async (req, res) => {
    try {
        const data = await (0, tournament_service_1.createTournamentService)(req.body);
        return res.status(201).json({
            success: true,
            data,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Failed to create tournament",
        });
    }
};
exports.createTournamentController = createTournamentController;
// ✅ GET ALL
const getAllTournamentsController = async (req, res) => {
    try {
        const data = await (0, tournament_service_1.getAllTournamentsService)();
        return res.status(200).json({
            success: true,
            data,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch tournaments",
        });
    }
};
exports.getAllTournamentsController = getAllTournamentsController;
// ✅ GET BY ID
const getTournamentByIdController = async (req, res) => {
    try {
        const data = await (0, tournament_service_1.getTournamentByIdService)(req.params.id);
        return res.status(200).json({
            success: true,
            data,
        });
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message || "Tournament not found",
        });
    }
};
exports.getTournamentByIdController = getTournamentByIdController;
// ✅ UPDATE
const updateTournamentController = async (req, res) => {
    try {
        const data = await (0, tournament_service_1.updateTournamentService)(req.params.id, req.body);
        return res.status(200).json({
            success: true,
            data,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Failed to update tournament",
        });
    }
};
exports.updateTournamentController = updateTournamentController;
// ✅ DELETE
const deleteTournamentController = async (req, res) => {
    try {
        await (0, tournament_service_1.deleteTournamentService)(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Tournament deleted successfully",
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Failed to delete tournament",
        });
    }
};
exports.deleteTournamentController = deleteTournamentController;
