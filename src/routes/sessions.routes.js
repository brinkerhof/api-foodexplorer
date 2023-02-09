import { Router } from "express";

import AuthController from "../controllers/AuthController.js";

const sessionsRoutes = Router();

const authController = new AuthController();

sessionsRoutes.post("/sessions", authController.create);

export default sessionsRoutes;
