"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const match_controller_1 = require("./match.controller");
const router = (0, express_1.Router)();
router.get("/", match_controller_1.getMatchesController);
router.patch("/:id", match_controller_1.updateMatchController);
exports.default = router;
