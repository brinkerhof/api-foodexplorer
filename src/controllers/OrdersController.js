import knex from "../database/knex/index.js";
import AppError from "../utils/AppError.js";

export default class OrdersController {
  async index(req, res) {
    const orders = await knex("orders");

    return res.json(orders);
  }
  async show(req, res) {}
  async create(req, res) {}
  async update(req, res) {}
  async delete(req, res) {}
}
