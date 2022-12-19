import { Router } from "express";

import UsersController from "../controllers/UsersController.js";
import ensureAuthenticated from "../middlewares/ensureAuthenticated.js";

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.get("/", usersController.index);
usersRoutes.get("/:id", usersController.show);
usersRoutes.post("/", usersController.create);
usersRoutes.put("/:id", ensureAuthenticated, usersController.update);
usersRoutes.delete("/:id", ensureAuthenticated, usersController.delete);

export default usersRoutes;
