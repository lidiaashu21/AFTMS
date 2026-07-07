import { Router } from "express";

import authRoutes from "../module/auth/auth.route";
import teamRoutes from "../module/team/team.route";
import tournamentRoutes from "../module/tournament/tournament.route";
import paymentRoutes from "../module/payment/payment.route";
import fixtureRoutes from "../module/fixture/fixture.route";
import matchRoutes from "../module/match/match.route";
import announcementRoutes from "../module/announcement/announcement.route";
import registerRoutes from "../module/register/register.route";
import reportsRoutes from "../module/report/report.route";
const router = Router();

// API BASE PATHS
router.use("/auth", authRoutes);
router.use("/teams", teamRoutes);
router.use("/tournaments", tournamentRoutes);
router.use("/payments", paymentRoutes);
router.use("/register", registerRoutes);
router.use("/fixtures", fixtureRoutes);
router.use("/matches", matchRoutes);
router.use("/announcements", announcementRoutes);
router.use("/reports", reportsRoutes);
export default router;
