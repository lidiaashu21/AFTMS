"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const report_controller_1 = require("./report.controller");
const router = (0, express_1.Router)();
// GET /api/reports
router.get("/", report_controller_1.getReportsController);
exports.default = router;
