import { Router } from "express";
import { getReportsController } from "./report.controller";

const router = Router();

// GET /api/reports
router.get("/", getReportsController);

export default router;
