import { signUpSchema } from "../schemas/signUpSchema.js";
import bcrypt from "bcrypt";
import { checkIfUserExists } from "../repositories/authRepository.js";
import dotenv from "dotenv";

dotenv.config();

async function authMiddleware(req, res, next) {
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
  } catch (error) {
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

/* const secretKey = process.env.SECRET_KEY;
res.locals.secretKey = secretKey; */

export { authMiddleware };