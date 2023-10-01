import express, { json } from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";
import { PostController, UserController } from "./Controllers/index.js";

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

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.get("/auth/me", checkAuth, UserController.register);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.getMe
);

app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.delete("/posts/:id", checkAuth, PostController.deletePost);
app.patch("/posts/:id", checkAuth, PostController.updatePost);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
