import { Router } from "express";
import { getUserUrls } from "../controllers/usersController.js";
import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";
import { getUserUrlsMiddleware } from "../middlewares/usersMiddleware.js";

const router = Router();

router.get(
  '/users/me', 
  tokenMiddleware, 
  getUserUrlsMiddleware, 
  getUserUrls
);

export default router;