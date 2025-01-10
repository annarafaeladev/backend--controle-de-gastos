import { Router } from "express";
import AuthenticationController from "../controller/AuthenticationController.js";

import { loginCredencials } from "../middleware/authenticate-jwt.js";

const router = Router();

// router.use(loginCredencials);

router.post("/auth/login", loginCredencials, AuthenticationController.login);

export { router as authRouter };
