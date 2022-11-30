import { Router } from "express";

import OrdersController from "../controllers/OrdersController.js";
import ensureAuthenticated from "../middlewares/ensureAuthenticated.js";

const ordersController = new OrdersController();

const ordersRoutes = Router();

ordersRoutes.get("/", ensureAuthenticated, ordersController.index);
ordersRoutes.get("/:id", ensureAuthenticated, ordersController.show);
ordersRoutes.get("/", ensureAuthenticated, ordersController.create);
ordersRoutes.get("/:id", ensureAuthenticated, ordersController.update);
ordersRoutes.get("/:id", ensureAuthenticated, ordersController.delete);

export default ordersRoutes;
