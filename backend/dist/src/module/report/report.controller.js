"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReportsController = void 0;
const report_service_1 = require("./report.service");
const getReportsController = async (req, res) => {
    try {
        const data = await (0, report_service_1.getReportsService)();
        res.status(200).json({
            success: true,
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch reports",
        });
    }
};
exports.getReportsController = getReportsController;
