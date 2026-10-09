"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFixtureController = exports.updateFixtureController = exports.getFixturesController = exports.createFixtureController = void 0;
const fixture_service_1 = require("./fixture.service");
/*
==================================================
CREATE FIXTURE
==================================================
*/
const createFixtureController = async (req, res) => {
    try {
        const data = await (0, fixture_service_1.createFixtureService)(req.body);
        return res.status(201).json({
            success: true,
            data,
        });
    }
    catch (error) {
        console.error("CREATE FIXTURE ERROR:", error);
        return res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to create fixture",
        });
    }
};
exports.createFixtureController = createFixtureController;
/*
==================================================
GET ALL FIXTURES
==================================================
*/
const getFixturesController = async (req, res) => {
    try {
        const data = await (0, fixture_service_1.getFixturesService)();
        return res.status(200).json({
            success: true,
            data,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to fetch fixtures",
        });
    }
};
exports.getFixturesController = getFixturesController;
/*
==================================================
UPDATE FIXTURE
==================================================
*/
const updateFixtureController = async (req, res) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Fixture id required",
            });
        }
        const data = await (0, fixture_service_1.updateFixtureService)(id, req.body);
        return res.status(200).json({
            success: true,
            data,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to update fixture",
        });
    }
};
exports.updateFixtureController = updateFixtureController;
/*
==================================================
DELETE FIXTURE
==================================================
*/
const deleteFixtureController = async (req, res) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Fixture id required",
            });
        }
        await (0, fixture_service_1.deleteFixtureService)(id);
        return res.status(200).json({
            success: true,
            message: "Fixture deleted successfully",
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to delete fixture",
        });
    }
};
exports.deleteFixtureController = deleteFixtureController;
