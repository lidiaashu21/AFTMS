"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("../module/auth/auth.route"));
const team_route_1 = __importDefault(require("../module/team/team.route"));
const tournament_route_1 = __importDefault(require("../module/tournament/tournament.route"));
const payment_route_1 = __importDefault(require("../module/payment/payment.route"));
const fixture_route_1 = __importDefault(require("../module/fixture/fixture.route"));
const match_route_1 = __importDefault(require("../module/match/match.route"));
const announcement_route_1 = __importDefault(require("../module/announcement/announcement.route"));
const register_route_1 = __importDefault(require("../module/register/register.route"));
const report_route_1 = __importDefault(require("../module/report/report.route"));
const router = (0, express_1.Router)();
// API BASE PATHS
router.use("/auth", auth_route_1.default);
router.use("/teams", team_route_1.default);
router.use("/tournaments", tournament_route_1.default);
router.use("/payments", payment_route_1.default);
router.use("/register", register_route_1.default);
router.use("/fixtures", fixture_route_1.default);
router.use("/matches", match_route_1.default);
router.use("/announcements", announcement_route_1.default);
router.use("/reports", report_route_1.default);
exports.default = router;
