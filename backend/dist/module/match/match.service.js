"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMatchService = exports.getMatchesService = void 0;
const match_repository_1 = require("./match.repository");
const getMatchesService = async () => {
    return (0, match_repository_1.getMatchesFromDB)();
};
exports.getMatchesService = getMatchesService;
const updateMatchService = async (id, data) => {
    return (0, match_repository_1.updateMatchInDB)(id, data);
};
exports.updateMatchService = updateMatchService;
