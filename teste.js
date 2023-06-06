import knex from "./src/database/knex/index.js";


const name = await knex("users").select("name")

console.log(name)