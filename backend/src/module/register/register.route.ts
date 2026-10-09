import { Router } from "express";
import multer from "multer";
import { registerController } from "./register.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/", authenticate, upload.single("receipt"), registerController);

export default router;
