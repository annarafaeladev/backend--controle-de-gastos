import { Request, Response, Router } from 'express';
import { authRouter } from "./authRoutes";
import { transacitonsRouter } from "./transactionsRoutes";

const routes = Router();

routes.get("/api/status", (_req: Request, res: Response): void => {
    res.status(201).json({ status: "Api is running..." });
});


routes.use(authRouter);
routes.use(transacitonsRouter);

export { routes };
