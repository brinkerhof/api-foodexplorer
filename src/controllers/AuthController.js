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
      const user = await knex("users").where({ email }).first();
      const user_id = user?.id;

      if (!user) {
        throw new AppError("Email or password is incorrect", 401);
      }

      const passwordMatched = await compare(password, user.password);

      if (!passwordMatched) {
        throw new AppError("Email or password is incorrect", 401);
      }
      const { secret, expiresIn } = jwtConfig;
      const token = jwt.sign({ user_id }, secret, { expiresIn });

      const booleanIsAdmin = !!user.isAdmin;

      const resUser = {
        id: user_id,
        name: user.name,
        email: user.email,
        isAdmin: booleanIsAdmin,
      };

      return res.json({ resUser, token });
    } catch (error) {
      next(error);
    }
  }
}
