import { nanoid } from 'nanoid';
import { createShortUrl, deleteUrl, getShortUrl } from "../repositories/urlsRepository.js";

export async function shortenUrl(req, res){
  const { userId, url } = res.locals;
  const shortUrl = nanoid(10);
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

export async function openShortUrl(req, res){
  const { url } = res.locals;
  res.redirect(url);
}

export async function deleteShortUrl(req, res){
  const { id } = req.params;
  try{
    await deleteUrl(id);
    return res.sendStatus(204);
  }
  catch(error){
    console.log(error);
    return res.sendStatus(500);
  }
}