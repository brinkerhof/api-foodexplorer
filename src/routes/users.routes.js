import { Router } from "express";

import UsersController from "../controllers/UsersController.js";

const usersController = new UsersController();

const usersRoutes = Router();

usersRoutes.get("/", usersController.index);

export default usersRoutes;
