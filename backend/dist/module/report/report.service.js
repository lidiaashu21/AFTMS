"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReportsService = void 0;
const report_repository_1 = require("../report/report.repository");
const getReportsService = async () => {
    return await (0, report_repository_1.getReportsFromDB)();
};
exports.getReportsService = getReportsService;
