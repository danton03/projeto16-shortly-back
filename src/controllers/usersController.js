import { getUserData } from "../repositories/usersRepository.js";

export async function getUserUrls(req, res){
  const { user } = res.locals;
  try {
    const userData = await getUserData(user);
    return res.status(200).send(userData);
  } 
  catch{
    return res.sendStatus(500);
  }
}