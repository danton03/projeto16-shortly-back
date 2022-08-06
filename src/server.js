import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import urlsRoute from "./routes/urlsRoute.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(json());
app.use(authRoute);
app.use(urlsRoute);

const PORT = process.env.PORT;
app.listen(PORT,()=>console.log(`Servidor rodando na porta ${PORT}`));