import { Router } from "express";
import AuthenticationController from "../controller/AuthenticationController";

import { loginCredencials } from "../middleware/authenticate-jwt";

const router = Router();

router.post("/auth/login", loginCredencials, AuthenticationController.login);

export { router as authRouter };
