import express from "express";
import "dotenv/config";
import cors from "cors";
import { v4 as uuidv4, v4 } from "uuid";
import mongoose from "mongoose";
import { validationResult } from "express-validator";
import { registerValidation } from "./validations/auth.js";

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

app.post("/auth/register", registerValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  res.json({
    success: true,
  });
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
