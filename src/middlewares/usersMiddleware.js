import { searchUser } from "../repositories/usersRepository.js";

export async function getUserUrlsMiddleware(req, res, next) {
  const { userId } = res.locals;
  try {
    const user = await searchUser(userId);
  
    if(!user){
      return res.sendStatus(404);
    }

    res.locals.user = user;
    next();
  } catch (error){
    return res.sendStatus(500);
  }
}