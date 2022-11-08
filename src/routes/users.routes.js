import { Router } from "express";

import UsersController from "../controllers/UsersController.js";

const usersController = new UsersController();

const usersRoutes = Router();

usersRoutes.get("/", usersController.index);
usersRoutes.get("/:id", usersController.show);
usersRoutes.get("/", usersController.create);
usersRoutes.get("/:id", usersController.update);
usersRoutes.get("/:id", usersController.delete);

export default usersRoutes;
