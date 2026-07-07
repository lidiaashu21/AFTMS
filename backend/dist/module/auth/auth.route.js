"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const autherize_1 = require("../../middleware/autherize");
const router = (0, express_1.Router)();
/* AUTH */
router.post("/register", auth_controller_1.registerController);
router.post("/login", auth_controller_1.loginController);
/* ADMIN CREATE */
router.post("/create-admin", auth_middleware_1.authenticate, (0, autherize_1.authorize)("ADMIN"), auth_controller_1.createAdminController);
/* ADMIN CRUD */
router.get("/admins", auth_middleware_1.authenticate, (0, autherize_1.authorize)("ADMIN"), auth_controller_1.getAllAdminsController);
router.get("/admins/:id", auth_middleware_1.authenticate, (0, autherize_1.authorize)("ADMIN"), auth_controller_1.getAdminByIdController);
router.put("/admins/:id", auth_middleware_1.authenticate, (0, autherize_1.authorize)("ADMIN"), auth_controller_1.updateAdminController);
router.delete("/admins/:id", auth_middleware_1.authenticate, (0, autherize_1.authorize)("ADMIN"), auth_controller_1.deleteAdminController);
exports.default = router;
