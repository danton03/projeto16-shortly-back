import { Router } from "express";
import { shortenUrl } from "../controllers/urlsController.js";
import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";
import { shortenUrlMiddleware } from "../middlewares/urlsMiddleware.js";

const router = Router();

router.post(
  '/urls/shorten', 
  tokenMiddleware, 
  shortenUrlMiddleware, 
  shortenUrl
);

export default router;