import knex from "../database/knex/index.js";
import AppError from "../utils/AppError.js";

export default class PlatesController {
  async index(req, res) {
    const plates = await knex("plates");

    return res.json(plates);
  }
  async show(req, res) {}
  async create(req, res) {}
  async update(req, res) {}
  async delete(req, res) {}
}
