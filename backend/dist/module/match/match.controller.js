"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMatchController = exports.getMatchesController = void 0;
const match_service_1 = require("./match.service");
const getString = (v) => Array.isArray(v) ? v[0] : v;
const getMatchesController = async (_req, res) => {
    try {
        const data = await (0, match_service_1.getMatchesService)();
        return res.json({
            success: true,
            data,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
exports.getMatchesController = getMatchesController;
const updateMatchController = async (req, res) => {
    try {
        const id = getString(req.params.id);
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Invalid match id",
            });
        }
        const data = await (0, match_service_1.updateMatchService)(id, req.body);
        return res.json({
            success: true,
            data,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
exports.updateMatchController = updateMatchController;
