import knex from "../database/knex/index.js";
import AppError from "../utils/AppError.js";

export default class UsersController {
  async index(req, res) {
    const users = await knex("users");

    return res.json(users);
  }
  //troca aqui
  async myInfos(req, res) {
    const user_id = req.user.id;

    const user = await knex("users").where({ id: user_id }).first();

    return res.json({ ...user, password: undefined });
  }
  async show(req, res) {
    const user_id = req.params.id;

    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return res.json(user);
  }
  async create(req, res) {
    const { name, email, password, isAdmin = false } = req.body;

    const emailVerifyIfExists = await knex("users").where({ email }).first();

    if (emailVerifyIfExists) {
      throw new AppError({ message: "Email already exists" }, 404);
    }

    await knex("users").insert({ name, email, password, isAdmin });

    return res.json("User created");
  }
  async update(req, res) {
    const { name, email, password, isAdmin } = req.body;
    const user_id = req.params.id;

    const emailVerifyIfExists = await knex("users").where({ email }).first();

    if (!emailVerifyIfExists) {
      throw new AppError("User already exists", 404);
    }

    await knex("users").update({ name, email, password, isAdmin });

    const userUpdated = await knex("users").where({ id: user_id });

    return res.json(userUpdated);
  }
  async delete(req, res) {
    const user_id = req.params.id;

    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
      throw new AppError("User not found", 404);
    }

    await knex("users").where({ id: user_id }).del();

    return res.json("Success delete");
  }
}
