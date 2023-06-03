import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import createError from "http-errors";
dotenv.config();
const accessTokenSecret: string = process.env.ACCESS_TOKEN_SECRET as string;
const jwtAuth = {
  signAccessToken(payload: any) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { payload, exp: Math.floor(Date.now() / 1000) + 10 * 60 },
        accessTokenSecret,
        {},
        (err: any, token: any) => {
          if (err) {
            console.log(err);
            reject(createError.InternalServerError());
          }
          resolve(token);
        }
      );
    });
  },
  verifyAccessToken(token: any) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, accessTokenSecret, (err: any, payload: any) => {
        if (err) {
          const message =
            err.name == "JsonWebTokenError" ? "Unauthorized" : err.message;
          return reject(createError.Unauthorized(message));
        }
        resolve(payload);
      });
    });
  },
};

export default jwtAuth;
