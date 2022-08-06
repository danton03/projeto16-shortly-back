import express, {json} from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(json());

app.use(authRoute);

const PORT = process.env.PORT;
app.listen(PORT,()=>console.log(`Servidor rodando na porta ${PORT}`));