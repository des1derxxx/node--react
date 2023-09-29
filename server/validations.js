import { body } from "express-validator";

export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен содердать минимум 5 символов").isLength({
    min: 4,
  }),
  body("fullName", "Имя должно содержать минимум 3 символа").isLength({
    min: 3,
  }),
];

export const loginValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен содердать минимум 5 символов").isLength({
    min: 4,
  }),
];

export const postCreateValidation = [
  body("title", "Введите заголовок статьи").isLength({ min: 3 }).isString(),
  body("text", "Введите текст статьи")
    .isLength({
      min: 10,
    })
    .isString(),
  body("tags", "Неверный формат тегов (укажите массив)").optional().isString(),
];
