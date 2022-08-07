import { getRanking } from "../repositories/rankingRepository.js";

export async function ranking(req, res){
  try {
    const ranking = await getRanking();
    return res.status(200).send(ranking);
  } 
  catch{
    return res.sendStatus(500);
  }
}