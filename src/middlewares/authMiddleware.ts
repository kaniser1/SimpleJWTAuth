import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IGetUserAuthInfoRequest } from "../types/requests";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

interface JwtPayload {
  id: number;
}

export const authenticateJWT = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.sendStatus(401).json({message: "No token, authorization denied"});
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err)
      return res.sendStatus(403).json({message: "Invalid token, authorization denied"});
    }

    req.user = user as JwtPayload;
    next();
  });
};
