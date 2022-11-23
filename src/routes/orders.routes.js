import { Router } from "express";

import OrdersController from "../controllers/OrdersController.js";

const ordersController = new OrdersController();

const ordersRoutes = Router();

ordersRoutes.get("/", ordersController.index);
ordersRoutes.get("/:id", ordersController.show);
ordersRoutes.get("/", ordersController.create);
ordersRoutes.get("/:id", ordersController.update);
ordersRoutes.get("/:id", ordersController.delete);

export default ordersRoutes;
