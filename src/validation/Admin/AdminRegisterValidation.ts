import Joi from "joi";
import { RegisterAdminDto } from "../../interfaces/Admin/AdminDtos";

const registerAdminValidation = (data: RegisterAdminDto) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(256).required().trim().messages({
      "string.min": "Az emailnek legalább 5 karakter hosszúnak kell lennie!",
      "string.max": "Az email hossza maximum 256 karakter lehet!",
      "any.required": `"Az email mező kötelező!`,
    }),
    password: Joi.string().min(8).max(256).required().trim().messages({
      "string.min": "A jelszónak legalább 8 karakter hosszúnak kell lennie!",
      "string.max": "A jelszó hossza maximum 256 karakter lehet!",
      "any.required": `"A jelszó mező kötelező!`,
    }),
    re_password: Joi.string().min(8).max(256).required().trim().messages({
      "string.min": "Az újra jelszónak legalább 8 karakter hosszúnak kell lennie!",
      "string.max": "Az újra jelszóß hossza maximum 256 karakter lehet!",
      "any.required": `"Az újra jelszó mező kötelező!`,
    }),
    name: Joi.string().min(6).max(128).required().trim().messages({
      "string.min": "A névnek legalább 6 karakter hosszúnak kell lennie!",
      "string.max": "A névnek hossza maximum 128 karakter lehet!",
      "any.required": `"A név mező kötelező!`,
    }),
  });
  return schema.validate(data);
};
export default registerAdminValidation;
