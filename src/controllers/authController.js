//import jwt from "jsonwebtoken";
import { handleCreateUser } from "../repositories/authRepository.js";

export async function createUser(req, res){
  const { user } = res.locals;
  try{
    handleCreateUser(user);
    return res.sendStatus(201);
  }
  catch(error){
    return res.sendStatus(500);
  }
}
