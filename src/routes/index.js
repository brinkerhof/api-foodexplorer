import { Router } from "express";

import usersRoutes from "./users.routes.js";
import platesRoutes from "./plates.routes.js";
import ordersRoutes from "./orders.routes.js";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/plates", platesRoutes);
routes.use("/orders", ordersRoutes);

export default routes;
