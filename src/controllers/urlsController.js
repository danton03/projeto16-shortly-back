import { nanoid } from 'nanoid';
import { createShortUrl } from "../repositories/urlsRepository.js";

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