import express from "express";
import "dotenv/config";
import cors from "cors";
import { v4 as uuidv4, v4 } from "uuid";
import mongoose from "mongoose";
import { validationResult } from "express-validator";
import { registerValidation } from "./validations/auth.js";
import UserModel from "./models/User.js";
import User from "./models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

let USERS = { 1: { id: v4(), name: "Ivan" }, 2: { id: v4(), name: "Vova" } };

app.post("/auth/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      return req.status(404).json({
        Message: "Пользователь не найден",
      });
    }
    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return req.status(404).json({
        Message: "неверный пароль или логин",
      });
    }
    const token = await jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );
    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {}
});

app.post("/auth/register", registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = toString(req.body.password);
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, Number(salt));

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = await jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      Message: "Не удалось зарегистрироваться ",
    });
  }
});

//app.get("/api/users", (req, res) => {
//  res.status(200).json(USERS);
//});
//
//app.post("/api/users", (req, res) => {
//  console.log(req.body);
//  res.json({
//    status: 201,
//  });
//});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
