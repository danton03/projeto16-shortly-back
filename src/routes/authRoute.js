import { Router } from "express";
import { createUser } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/signup', authMiddleware, createUser);

export default router;