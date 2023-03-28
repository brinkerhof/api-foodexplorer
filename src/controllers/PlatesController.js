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
  async showIngredients(req, res) {
    const plate_id = req.params.id;

    const [ingredients_id] = await knex("ingredients_in_plates").where({
      plate_id,
    });

    try {
      const ingredients = ingredients_id.map(async (ingredient_id) => {
        await knex("ingredients").where({ id: ingredient_id });
      });
      return ingredients;
    } catch (error) {
      console.log(error);
      next(error);
    }

    if (!plate) {
      throw new AppError("plate not found", 401);
    }

    return res.json(plate);
  }

  async create(req, res, next) {
    const user_id = "c97f47af-22ed-474a-a9b4-c9d89c6909f3";
    const plateFilename = req.file.filename;
    const toJson = JSON.parse(req.body.data);

    const { name, description, category, price, ingredients } = toJson;

    const priceFormatted = Number(price.replace(",", "."));

    const diskStorage = new DiskStorage();

    const image = await diskStorage.saveFile(plateFilename);

    const [plate_id] = await knex("plates")
      .insert({ name, description, category, image, priceFormatted, user_id })
      .returning("id");
    if (ingredients) {
      const listIngredientsIds = [];
      try {
        ingredients.map(async (ingredient) => {
          const { id } = await knex("ingredients")
            .select({ name: ingredient.name })
            .first();

          listIngredientsIds.push(id);
        });
      } catch (error) {}
      try {
        listIngredientsIds.map(async (ingredient_id) => {
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
