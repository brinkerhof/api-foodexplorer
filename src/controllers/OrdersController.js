import knex from "../database/knex/index.js";
import AppError from "../utils/AppError.js";

export default class OrdersController {
  async index(req, res) {
    const orders = await knex("orders");

    return res.json(orders);
  }
  async show(req, res) {
    const order_id = req.params.id;

    const order = await knex("orders").where({ id: order_id }).first();

    if (!order) {
      throw new AppError("Order do not exists", 401);
    }

    return res.json(order);
  }
  async create(req, res) {
    const user_id = req.user.id;
    const plates = req.body;

    const [order_id] = await knex("orders")
      .insert({ user_id, status: "ok", name: "Order" })
      .returning("id");

    try {
      plates.map(async (plate) => {
        await knex("plates_in_orders").insert({
          plate_id: plate.id,
          order_id: order_id.id,
        });
      });

      return res.json("Order created");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async update(req, res) {}
  async delete(req, res) {
    const order_id = req.params.id;

    const order = await knex("orders").where({ id: order_id });

    if (!order) {
      throw new AppError("No order found");
    }

    await knex("orders").where({ id: order_id }).del();

    return res.json("Sucess, order deleted");
  }
}
