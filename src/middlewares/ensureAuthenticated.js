import jwt from "jsonwebtoken";
import { jwtConfig } from "../configs/auth.js";
import AppError from "../utils/AppError.js";

const { verify } = jwt;

export default function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Invalid Token", 400);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { user_id } = verify(token, jwtConfig.secret);

    req.user = { id: user_id };

    return next();
  } catch (error) {
    throw new AppError("Invalid Token", 400);
  }
}
