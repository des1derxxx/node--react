import express, { json } from "express";
import "dotenv/config";
import cors from "cors";
import { v4 as uuidv4, v4 } from "uuid";
import mongoose from "mongoose";
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import User from "./models/User.js";
import * as UserController from "./Controllers/UserController.js";
import * as PostController from "./Controllers/PostController.js";

const app = express();
const port = process.env.PORT || 7000;

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("DB ok ");
  })
  .catch((err) => {
    console.log("DB error", err);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/auth/login", loginValidation, UserController.login);
app.get("/auth/me", checkAuth, UserController.register);
app.post("/auth/register", registerValidation, UserController.getMe);

app.post("/posts", checkAuth, postCreateValidation, PostController.create);
app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.delete("/posts/:id", checkAuth, PostController.deletePost);
app.patch("/posts/:id", checkAuth, PostController.updatePost);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
