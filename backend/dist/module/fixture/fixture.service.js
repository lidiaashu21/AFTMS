"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFixtureService = exports.updateFixtureService = exports.getFixturesService = exports.createFixtureService = void 0;
const fixture_repository_1 = require("./fixture.repository");
/*
==================================================
CREATE FIXTURE SERVICE
==================================================
*/
const createFixtureService = async (data) => {
    if (!data.homeTeamId || !data.awayTeamId) {
        throw new Error("Home team and away team are required.");
    }
    if (data.homeTeamId === data.awayTeamId) {
        throw new Error("Home team and away team cannot be the same.");
    }
    return await (0, fixture_repository_1.createFixtureInDB)(data);
};
exports.createFixtureService = createFixtureService;
/*
==================================================
GET ALL FIXTURES SERVICE
==================================================
*/
const getFixturesService = async () => {
    return await (0, fixture_repository_1.getFixturesFromDB)();
};
exports.getFixturesService = getFixturesService;
/*
==================================================
UPDATE FIXTURE SERVICE
==================================================
*/
const updateFixtureService = async (id, data) => {
    if (!id) {
        throw new Error("Fixture id is required.");
    }
    if (data.homeTeamId &&
        data.awayTeamId &&
        data.homeTeamId === data.awayTeamId) {
        throw new Error("Home team and away team cannot be the same.");
    }
    return await (0, fixture_repository_1.updateFixtureInDB)(id, data);
};
exports.updateFixtureService = updateFixtureService;
/*
==================================================
DELETE FIXTURE SERVICE
==================================================
*/
const deleteFixtureService = async (id) => {
    if (!id) {
        throw new Error("Fixture id is required.");
    }
    return await (0, fixture_repository_1.deleteFixtureInDB)(id);
};
exports.deleteFixtureService = deleteFixtureService;
