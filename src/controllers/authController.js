import jwt from "jsonwebtoken";
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

export async function login(req, res){
  const { user, secretKey } = res.locals;
  const userId = { id: user.id };
  const token = jwt.sign(userId, secretKey);
  try{
    return res.status(200).send({token});
  }
  catch(error){
    return res.sendStatus(500);
  }
}
