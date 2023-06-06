import knex from "../database/knex/index.js";
import { jwtConfig } from "../configs/auth.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import pkg from "bcryptjs";
const { compare } = pkg;

export default class AuthController {
  async create(req, res, next) {
    const { email, password } = req.body;

    try {
      const resUser = await knex("users").where({ email }).first();
      const user_id = resUser?.id;

      if (!resUser) {
        throw new AppError("Email or password is incorrect", 401);
      }

      const passwordMatched = await compare(password, resUser.password);

      if (!passwordMatched) {
        throw new AppError("Email or password is incorrect", 401);
      }
      const { secret, expiresIn } = jwtConfig;
      const token = jwt.sign({ user_id }, secret, { expiresIn });

      const booleanIsAdmin = !!resUser.isAdmin;

      const user = {
        id: user_id,
        name: resUser.name,
        email: resUser.email,
        isAdmin: booleanIsAdmin,
      };

      return res.json({ user, token });
    } catch (error) {
      next(error);
    }
  }
}
