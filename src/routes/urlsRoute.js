import { Router } from "express";
import { getShortUrlById, shortenUrl } from "../controllers/urlsController.js";
import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";
import { shortenUrlMiddleware } from "../middlewares/urlsMiddleware.js";

const router = Router();

router.post(
  '/urls/shorten', 
  tokenMiddleware, 
  shortenUrlMiddleware, 
  shortenUrl
);

router.get('/urls/:id', getShortUrlById);

export default router;