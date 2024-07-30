// Mock Database
import { User } from "./interfaces";

let users: User[] = [];
let currentId = 1;

export const addUser = (username: string, hashedPassword: string): User => {
  const newUser: User = { id: currentId++, username, password: hashedPassword };
  users.push(newUser);
  return newUser;
};

export const findUserByUsername = (username: string): User | undefined => {
  return users.find((user) => user.username === username);
};

export const findUserById = (id: number): User | undefined => {
  return users.find((user) => user.id === id);
};
