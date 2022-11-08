import knex from "../database//knex/index.js";

export default class UsersController {
  async index(req, res) {
    const users = await knex("users");

    return res.json(users);
  }
  async show(req, res) {}
  async create(req, res) {}
  async update(req, res) {}
  async delete(req, res) {}
}
