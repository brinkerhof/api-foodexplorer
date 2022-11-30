import knex from "../database/knex/index.js";
import AppError from "../utils/AppError.js";

export default class PlatesController {
  async index(req, res) {
    const plates = await knex("plates");

    return res.json(plates);
  }
  async show(req, res) {
    const plate_id = req.params.id;

    const plate = await knex("plates").where({ id: plate_id }).first();

    if (!plate) {
      throw new AppError("plate not found", 401);
    }

    return res.json(plate);
  }
  async create(req, res) {}
  async update(req, res) {}
  async delete(req, res) {}
}
