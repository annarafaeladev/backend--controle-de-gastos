import express from "express";
import { authRouter } from "./authRoutes.js";
import { transacitonsRouter } from "./transactionsRoutes.js";
const routes = express.Router();

routes.get("/api/status", async (request, response) =>
  response.status(202).json({ status: "Api is runnning..." })
);

routes.use(authRouter);
routes.use(transacitonsRouter);

export { routes };
