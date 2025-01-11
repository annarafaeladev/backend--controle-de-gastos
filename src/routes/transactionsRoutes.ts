import { Router } from "express";
import TransactionController from "../controller/TransactionController";
import { authenticateToken } from "../middleware/authenticate-jwt";

const router = Router();

router.use(authenticateToken);

router.get("/transactions", TransactionController.findByUser);

export { router as transacitonsRouter };
