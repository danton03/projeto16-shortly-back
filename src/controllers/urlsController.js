import { nanoid } from 'nanoid';
import { createShortUrl, getShortUrl } from "../repositories/urlsRepository.js";

export async function shortenUrl(req, res){
  const { userId, url } = res.locals;
  const shortUrl = nanoid(10);
  console.log(shortUrl); 
  try{
    await createShortUrl(userId, url, shortUrl);
    return res.status(201).send({shortUrl});
  }
  catch(error){
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getShortUrlById(req, res){
  const { id } = req.params;
  try{
    const shortUrl = await getShortUrl(id);
    if(!shortUrl){
      return res.sendStatus(404);
    }
    return res.status(200).send(shortUrl);
  }
  catch{
    return res.sendStatus(500);
  }
}