import { Router } from "express";

import UsersController from "../controllers/UsersController.js";
import ensureAuthenticated from "../middlewares/ensureAuthenticated.js";

const usersController = new UsersController();

const usersRoutes = Router();

usersRoutes.get("/", usersController.index);
usersRoutes.get("/:id", usersController.show);
usersRoutes.get("/", usersController.create);
usersRoutes.get("/:id", ensureAuthenticated, usersController.update);
usersRoutes.get("/:id", ensureAuthenticated, usersController.delete);

export default usersRoutes;
