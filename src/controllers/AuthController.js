import knex from "../database/knex/index.js";
import { jwtConfig } from "../configs/auth.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

export default class AuthController {
  async create(req, res,next) {
    console.log(req.body)
    const { email, password } = req.body;
    
    try {
      const user = await knex("users").where({ email }).first();
      const user_id = user?.id;

      if (!user) {
        throw new AppError("Email or password is incorrect", 401);
      }
  
      if (!(password == user.password)) {
        throw new AppError("Email or password is incorrect", 401);
      }
      const { secret, expiresIn } = jwtConfig;
      const token = jwt.sign({ user_id }, secret, { expiresIn });

      return res.json({ user, token });
    } catch (error) {
      next(error)
    }
  }
}
