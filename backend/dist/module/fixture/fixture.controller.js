"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFixtureController = exports.updateFixtureController = exports.getFixturesController = exports.createFixtureController = void 0;
const fixture_service_1 = require("./fixture.service");
// =========================
// CREATE
// =========================
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
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to create fixture",
        });
    }
};
exports.createFixtureController = createFixtureController;
// =========================
// GET ALL
// =========================
const getFixturesController = async (req, res) => {
    try {
        const data = await (0, fixture_service_1.getFixturesService)();
        return res.status(200).json({
            success: true,
            data,
        });
    }
    catch (error) {
        console.error("GET FIXTURES ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch fixtures",
        });
    }
};
exports.getFixturesController = getFixturesController;
// =========================
// UPDATE
// =========================
const updateFixtureController = async (req, res) => {
    try {
        const idParam = req.params.id;
        // ✅ FIX: ensure string type
        const id = Array.isArray(idParam) ? idParam[0] : idParam;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Fixture ID is required",
            });
        }
        const data = await (0, fixture_service_1.updateFixtureService)(id, req.body);
        return res.status(200).json({
            success: true,
            data,
        });
    }
    catch (error) {
        console.error("UPDATE FIXTURE ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to update fixture",
        });
    }
};
exports.updateFixtureController = updateFixtureController;
// =========================
// DELETE
// =========================
const deleteFixtureController = async (req, res) => {
    try {
        const idParam = req.params.id;
        // ✅ FIX: safe string conversion
        const id = Array.isArray(idParam) ? idParam[0] : idParam;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Fixture ID is required",
            });
        }
        await (0, fixture_service_1.deleteFixtureService)(id);
        return res.status(200).json({
            success: true,
            message: "Fixture deleted successfully",
        });
    }
    catch (error) {
        console.error("DELETE FIXTURE ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to delete fixture",
        });
    }
};
exports.deleteFixtureController = deleteFixtureController;
