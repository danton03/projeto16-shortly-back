import { getUserData } from "../repositories/usersRepository.js";

export async function getUserUrls(req, res){
  const { user } = res.locals;
  try {
    const userData = await getUserData(user);
    return res.status(201).send(userData);
  } 
  catch (error){
    console.log(error);
    return res.sendStatus(500);
  }
}