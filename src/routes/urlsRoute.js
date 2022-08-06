import { Router } from "express";
import { getShortUrlById, openShortUrl, shortenUrl } from "../controllers/urlsController.js";
import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";
import { getUrlMiddleware, shortenUrlMiddleware } from "../middlewares/urlsMiddleware.js";

const router = Router();

router.post(
  '/urls/shorten', 
  tokenMiddleware, 
  shortenUrlMiddleware, 
  shortenUrl
);

router.get('/urls/:id', getShortUrlById);
router.get('/urls/open/:shortUrl', getUrlMiddleware, openShortUrl);

export default router;