import { signUpSchema } from "../schemas/signUpSchema.js";
import bcrypt from "bcrypt";
import { checkIfUserExists } from "../repositories/authRepository.js";
import dotenv from "dotenv";
import { signInSchema } from "../schemas/signInSchema.js";

dotenv.config();

export async function signUpMiddleware(req, res, next) {
  const userData = req.body;
  
  //Validação do formato do corpo da requisição
  const validateUser = signUpSchema.validate(userData);
  if(validateUser.error){ 
    return res.sendStatus(422);
  }

  //Validação para impedir usuário duplicado
  const email = userData.email.toLowerCase();
  try {
    const userExists = await checkIfUserExists(email);
    if(userExists){
      return res.sendStatus(409);
    }
  } 
  catch (error) {
    return res.sendStatus(500);
  }

  //Encryptando a senha
  const { password } = userData;
  const encryptedPassword = bcrypt.hashSync(password, 10);

  //Passa os dados validados para o controller
  const user = {
    ...userData,
    email, 
    password: encryptedPassword
  }
  delete user.confirmPassword;

  res.locals.user = user;
  next();
}

export async function signInMiddleware(req, res, next) {
  const userData = req.body;

  const validateUser = signInSchema.validate(userData);
  if(validateUser.error){ 
    return res.sendStatus(422);
  }

  try {
    const email = userData.email.toLowerCase();
    const user = await checkIfUserExists(email);
    
    if(!user){
      return res.sendStatus(401);
    }

    //comparação da senha
    const { password } = userData;
    const encyptedPassword = user.password;
    const comparePassword = bcrypt.compareSync(password, encyptedPassword);

    if(!comparePassword){
      return res.sendStatus(401);
    }

    const secretKey = process.env.SECRET_KEY;
    res.locals.secretKey = secretKey;
    res.locals.user = user;
    next();
  } 
  catch (error) {
    return res.sendStatus(503);
  }
}