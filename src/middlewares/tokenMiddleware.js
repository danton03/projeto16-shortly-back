import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export async function tokenMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.split(' ')[1]; //split -> ['Bearer', token] -> split[1] = token
  const secretKey = process.env.SECRET_KEY;
  try {
    const user = jwt.verify(token, secretKey);
    res.locals.userId = user.id;
    next();
  } 
  catch{
    return res.sendStatus(401);
  }
}