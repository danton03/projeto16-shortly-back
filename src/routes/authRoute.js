import { Router } from "express";
import { createUser, login } from "../controllers/authController.js";
import { signInMiddleware, signUpMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/signup', signUpMiddleware, createUser);
router.post('/signin', signInMiddleware, login);

export default router;