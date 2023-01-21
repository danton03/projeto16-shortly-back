import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import urlsRoute from "./routes/urlsRoute.js";
import usersRoute from "./routes/usersRoute.js";
import rankingRoute from "./routes/rankingRoute.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(json());

app.use(authRoute);
app.use(urlsRoute);
app.use(usersRoute);
app.use(rankingRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Servidor rodando na porta ${PORT}`));