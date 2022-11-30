import { verify } from "jsonwebtoken";
import { jwt } from "../configs/auth.js";
import AppError from "../utils/AppError.js";

export default function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Invalid Token", 400);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { user_id } = verify(token, jwt.secret);

    req.user = { id: user_id };

    return next();
  } catch (error) {
    throw new AppError("Invalid Token", 400);
  }
}
