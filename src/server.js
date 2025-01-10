import express from "express";
import { routes } from "./routes/routes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/v1", routes);

app.listen(process.env.SERVER_PORT, () =>
  console.log("API rest iniciada na porta:", process.env.SERVER_PORT)
);
