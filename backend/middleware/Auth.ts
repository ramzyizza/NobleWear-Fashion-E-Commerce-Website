import jwt from "../utils/jwtAuth";
import createError from "http-errors";
const auth = async (req: any, res: any, next: any) => {
  if (!req.headers.authorization) {
    return next(createError.Unauthorized("Access token is required"));
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return next(createError.Unauthorized());
  }
  await jwt
    .verifyAccessToken(token)
    .then((user: any) => {
      req.user = user;
      next();
    })
    .catch((error: any) => {
      next(createError.Unauthorized(error.message));
    });
};
export default auth;
