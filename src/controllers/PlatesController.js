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

    const ingredientsInPlatesListId = [];
    const realIngredients = [];

    const plate = await knex("plates").where({ id: plate_id }).first();

    const ingredientsInPlates = await knex("ingredients_in_plates").where({
      plate_id,
    });
    ingredientsInPlates.map((ingredient) => {
      ingredientsInPlatesListId.push(ingredient.ingredient_id);
    });
    for (const item of ingredientsInPlatesListId) {
      const newIngredient = await knex("ingredients")
        .where({ id: item })
        .first();
      realIngredients.push(newIngredient);
    }
    console.log(ingredientsInPlatesListId);

    const realPlateIngredients = {
      name: plate.name,
      description: plate.description,
      image: plate.image,
      category: plate.category,
      price: plate.price,
      ingredients: realIngredients,
    };
    return res.json(realPlateIngredients);
  }
  x1;
  async create(req, res, next) {
    const user_id = req.user.id;
    const plateFilename = req.file.filename;

    const { name, description, category, price, ingredients } = req.body;
    console.log({ ingredients });

    const priceFormatted = Number(price.replace(",", "."));

    const diskStorage = new DiskStorage();

    const image = await diskStorage.saveFile(plateFilename);

    const [plate_id] = await knex("plates")
      .insert({
        name,
        description,
        category,
        image,
        price: priceFormatted,
        user_id,
      })
      .returning("id");
    if (ingredients) {
      try {
        ingredients.map(async (ingredient) => {
          const { id } = await knex("ingredients")
            .where({ name: ingredient })
            .first();
          await knex("ingredients_in_plates").insert({
            ingredient_id: id,
            plate_id: plate_id.id,
          });
        });
        return res.json("Plate created");
      } catch (error) {
        next(error);
      }
    }
    return res.json("Plate created");
  }
  async update(req, res) {
    const { name, description, category, image, price, ingredients } = req.body;
    const { id } = req.params;

    const plate = await knex("plates").where({ id }).first();

    plate.name = name ?? plate.name;
    plate.description = description ?? plate.description;
    plate.category = category ?? plate.category;
    plate.price = price ?? plate.price;
    plate.image = image ?? plate.image;

    await knex("plates").where({ id }).update(plate);
    await knex("plates").where({ id }).update("updated_at", knex.fn.now());
    console.log(ingredients);

    await knex("ingredients_in_plates").where({ plate_id: id }).delete();
    await knex("ingredients_in_plates")
      .where({ plate_id: id })
      .insert(ingredientsInsert);

    return res.json("deu certo");
  }
  async delete(req, res) {
    const plate_id = req.params.id;

    const plate = await knex("plates").where({ id: plate_id });

    if (!plate) {
      throw new AppError("No plate found");
    }

    await knex("plates").where({ id: plate_id }).del();

    return res.json("Sucess, plate deleted");
  }
}
