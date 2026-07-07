import { Router } from "express";
import multer from "multer";
import { registerController } from "./register.controller";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/", upload.single("receipt"), registerController);

export default router;
