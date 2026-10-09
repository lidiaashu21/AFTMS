"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_controller_1 = require("./team.controller");
const router = (0, express_1.Router)();
router.post("/", team_controller_1.createTeamController);
router.get("/", team_controller_1.getAllTeamsController);
router.get("/:id", team_controller_1.getTeamByIdController);
exports.default = router;
