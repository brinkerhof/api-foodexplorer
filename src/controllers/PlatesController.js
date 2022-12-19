import knex from "../database/knex/index.js";
import AppError from "../utils/AppError.js";
import DiskStorage from "../providers/DiskStorage.js";

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
  async create(req, res, next) {
    const user_id = "c97f47af-22ed-474a-a9b4-c9d89c6909f3";
    const plateFilename = req.file.filename;
    const toJson = JSON.parse(req.body.data);

    const { name, description, price, ingredients_id } = toJson;

    const diskStorage = new DiskStorage();

    const image = await diskStorage.saveFile(plateFilename);

    const [plate_id] = await knex("plates")
      .insert({ name, description, image, price, user_id })
      .returning("id");
    if (ingredients_id) {
      try {
        ingredients_id.map(async (ingredient_id) => {
          await knex("ingredients_in_plates").insert({
            ingredient_id,
            plate_id,
          });
        });
        return res.json("Plate created");
      } catch (error) {
        console.log(error);
        next(error);
      }
    }
    return res.json("Plate created");
  }
  async update(req, res) {}
  async delete(req, res) {}
}
