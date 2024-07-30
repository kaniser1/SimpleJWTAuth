import { Router, Response } from "express";
import { register, login } from "../controllers/authController";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { IGetUserAuthInfoRequest } from "../types/requests";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/protected", authenticateJWT, (req: IGetUserAuthInfoRequest, res: Response) => {
  res.json({ message: "This is a protected route", user: req.user });
});

export default router;
