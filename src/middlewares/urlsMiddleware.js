import { urlSchema } from "../schemas/urlSchema.js";

export async function shortenUrlMiddleware(req, res, next) {
  const body = req.body;
  const { url }  = body;
  
  const validateUrl = urlSchema.validate(body);
  if(validateUrl.error){
    return res.sendStatus(422);
  }

  res.locals.url = url;
  next();
}
