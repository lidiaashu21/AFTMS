"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFixtureService = exports.updateFixtureService = exports.getFixturesService = exports.createFixtureService = void 0;
const fixture_repository_1 = require("./fixture.repository");
const createFixtureService = (data) => {
    return (0, fixture_repository_1.createFixtureInDB)(data);
};
exports.createFixtureService = createFixtureService;
const getFixturesService = () => {
    return (0, fixture_repository_1.getFixturesFromDB)();
};
exports.getFixturesService = getFixturesService;
const updateFixtureService = (id, data) => {
    return (0, fixture_repository_1.updateFixtureInDB)(id, data);
};
exports.updateFixtureService = updateFixtureService;
const deleteFixtureService = (id) => {
    return (0, fixture_repository_1.deleteFixtureInDB)(id);
};
exports.deleteFixtureService = deleteFixtureService;
