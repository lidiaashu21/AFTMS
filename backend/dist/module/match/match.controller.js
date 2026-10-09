"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMatchController = exports.getMatchesController = void 0;
const match_service_1 = require("./match.service");
const match_validation_1 = require("./match.validation");
const getString = (value) => {
    return Array.isArray(value) ? value[0] : value;
};
/* =========================
   GET ALL MATCHES
========================= */
const getMatchesController = async (_req, res) => {
    try {
        const data = await (0, match_service_1.getMatchesService)();
        return res.status(200).json({
            success: true,
            data,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch matches",
        });
    }
};
exports.getMatchesController = getMatchesController;
/* =========================
   UPDATE MATCH
========================= */
const updateMatchController = async (req, res) => {
    try {
        const id = getString(req.params.id);
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Match id is required",
            });
        }
        console.log("UPDATE MATCH BODY:", JSON.stringify(req.body, null, 2));
        // =========================
        // ZOD VALIDATION
        // =========================
        const validation = match_validation_1.updateMatchSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Validation Error",
                errors: validation.error.flatten(),
            });
        }
        const data = await (0, match_service_1.updateMatchService)(id, validation.data);
        return res.status(200).json({
            success: true,
            data,
        });
    }
    catch (error) {
        console.log("UPDATE MATCH ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to update match",
        });
    }
};
exports.updateMatchController = updateMatchController;
