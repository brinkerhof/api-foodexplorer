import { Router } from "express";

import OrdersController from "../controllers/OrdersController.js";
import ensureAuthenticated from "../middlewares/ensureAuthenticated.js";

const ordersController = new OrdersController();

const ordersRoutes = Router();

ordersRoutes.get("/", ensureAuthenticated, ordersController.index);
ordersRoutes.get("/:id", ensureAuthenticated, ordersController.show);
ordersRoutes.post("/", ensureAuthenticated, ordersController.create);
ordersRoutes.put("/:id", ensureAuthenticated, ordersController.update);
ordersRoutes.delete("/:id", ensureAuthenticated, ordersController.delete);

export default ordersRoutes;
