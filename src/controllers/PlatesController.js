import knex from "../database/knex/index.js";
import AppError from "../utils/AppError.js";

export default class PlatesController {
  async index(req, res) {
    const { search } = req.query;
    if(search){
      console.log(search)
      
      const plates = await knex
      .select('plates.*')
      .from('plates')
      .leftJoin('ingredients', 'plates.id', 'ingredients.plate_id')
      .where('plates.name', 'like', `%${search}%`)
      .orWhere('ingredients.name', 'like', `%${search}%`)
      .groupBy('plates.id')
      console.log(plates)
     return res.json(plates);
    }else{
      const plates = await knex("plates")
      return res.json(plates);
      
    }
    

  }
  async show(req, res) {
    const {id} = req.params

    const plate = await knex("plates").where({id}).first()

    if (!plate){
      throw new AppError("Prato nao existe")
    }

    const ingredients = await knex("ingredients").where({plate_id: plate.id}).orderBy("name")

    return res.status(201).json({...plate, ingredients: ingredients})
  }
  async create(req, res, next) {
    let { name, description, category, price, ingredients } = req.body;

    const priceFormatted = Number(price.replace(",", "."));

    ingredients = ingredients ?? []

    const [plate_id] = await knex("plates")
      .insert({
        name,
        description,
        category,
        price: priceFormatted,
      })
      .returning("id");
    
    const id = plate_id.id
    
    ingredients.map(async (ingredient)=>{
      await knex("ingredients").insert({name: ingredient.trim(), plate_id:id})
    })

    return res.status(201).json({id: plate_id})
  }
  async update(req, res) {
    let { name, description, category , price, ingredients } = req.body;
    const { id } = req.params;
    console.log(id)

    const plate = await knex("plates").where({ id }).first();
    console.log(plate)

    plate.name = name ?? plate.name;
    plate.description = description ?? plate.description;
    plate.category = category ?? plate.category;
    plate.price = price ?? plate.price;

    await knex("plates").where({ id }).update(plate);

    ingredients = ingredients ?? []

    if(ingredients.length > 0){
      const oldIngredients = await knex("ingredients").where({plate_id: plate.id}).select("name").orderBy("name")

      const remove = oldIngredients.filter(
        (ingredient) => !ingredients.includes(ingredient)
      )
      
      await knex("ingredients").delete().where({plate_id: plate.id}).whereIn("name", remove)
      
      const newIngredients = ingredients.filter((ingredient)=>{!oldIngredients.includes(ingredient)}).map((ingredient)=>({name: ingredient.trim(), plate_id: plate.id}))

      if(newIngredients.length !== 0){
        newIngredients.map(async (ingredient)=>{
          await knex("ingredients").insert(ingredient)
        })

      }else{
        await knex('ingredients').delete().where({plate_id:plate.id})
      }

    }

    return res.json()
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
