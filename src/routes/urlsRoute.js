import { Router } from "express";
import { deleteShortUrl, getShortUrlById, openShortUrl, shortenUrl } from "../controllers/urlsController.js";
import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";
import { deleteUrlMiddleware, getUrlMiddleware, shortenUrlMiddleware } from "../middlewares/urlsMiddleware.js";

const router = Router();

router.post(
  '/urls/shorten', 
  tokenMiddleware, 
  shortenUrlMiddleware, 
  shortenUrl
);
router.get('/urls/:id', getShortUrlById);
router.get('/urls/open/:shortUrl', getUrlMiddleware, openShortUrl);
router.delete(
  '/urls/:id', 
  tokenMiddleware,
  deleteUrlMiddleware, 
  deleteShortUrl
);

export default router;