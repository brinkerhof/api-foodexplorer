import knex from "./src/database/knex/index.js";

const pegar = async () => {
  const id = await knex("ingredients").where({ name: ingredient }).first();
  return id;
};

pegar();
