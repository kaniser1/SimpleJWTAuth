import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { addUser, findUserByUsername } from "../models/userModel";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (findUserByUsername(username)) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = addUser(username, hashedPassword);

  res.status(201).json({ id: newUser.id, username: newUser.username });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = findUserByUsername(username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

  res.json({ token });
};
