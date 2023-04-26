const { hash } = require("bcryptjs");

exports.seed = async function (knex) {
  await knex("users").insert([
    {
      name: "admin",
      email: "admin@admin.com",
      password: await hash("123456", 8),
      isAdmin: true,
    },
    {
      name: "user",
      email: "user@user.com",
      password: await hash("123456", 8),
      isAdmin: false,
    },
  ]);
};
