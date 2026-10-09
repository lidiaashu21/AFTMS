"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMatchService = exports.getMatchesService = void 0;
const match_repository_1 = require("./match.repository");
/* =========================
   GET ALL MATCHES
========================= */
const getMatchesService = async () => {
    return await (0, match_repository_1.getMatchesFromDB)();
};
exports.getMatchesService = getMatchesService;
/* =========================
   UPDATE MATCH
========================= */
const updateMatchService = async (id, data) => {
    if (!id) {
        throw new Error("Match ID is required");
    }
    return await (0, match_repository_1.updateMatchInDB)(id, data);
};
exports.updateMatchService = updateMatchService;
