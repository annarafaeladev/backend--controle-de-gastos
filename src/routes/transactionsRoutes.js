import { Router } from "express";
import TransactionController from "../controller/TransactionController.js";
import { authenticateToken } from "../middleware/authenticate-jwt.js";

const router = Router();

router.use(authenticateToken);

router.get("/transactions", TransactionController.findByUser);

export { router as transacitonsRouter };
