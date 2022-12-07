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
  async create(req, res) {
    const user_id = req.user.id;
    const { name, description, image, price, ingredients_id } = req.body;

    const [plate_id] = await knex("plates")
      .insert({ name, description, image, price, user_id })
      .returning("id");
    try {
      ingredients_id.map(async (ingredient_id) => {
        await knex("ingredients_in_plates").insert({ ingredient_id, plate_id });
      });
      return res.json("Plate created");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async update(req, res) {}
  async delete(req, res) {}
}
