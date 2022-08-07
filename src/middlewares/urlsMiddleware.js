import { getUrl, searchUrl, updateCount } from "../repositories/urlsRepository.js";
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

export async function getUrlMiddleware(req, res, next) {
  const { shortUrl } = req.params;
  try {
    const urlData = await getUrl(shortUrl);
  
    if(!urlData){
      return res.sendStatus(404);
    }

    await updateCount(shortUrl); //atualiza a contagem de visitas
    res.locals.url = urlData.url;
    next();
  } catch {
    return res.sendStatus(500);
  }
}

export async function deleteUrlMiddleware(req, res, next) {
  const { id } = req.params;
  const { userId } = res.locals;
  try {
    const urlData = await searchUrl(id);
  
    if(!urlData){
      return res.sendStatus(404);
    }

    if(urlData.createdBy !== userId){
      return res.sendStatus(401);
    }
  
    next();
  } catch (error) {
    
    return res.sendStatus(500);
  }
}