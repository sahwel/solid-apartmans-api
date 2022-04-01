import Joi from "joi";
import { FaqDto } from "../../interfaces/Faq/FaqDtos";

const createEditFaqValidation = (data: FaqDto) => {
  const schema = Joi.object({
    questionHu: Joi.string().min(1).max(256).required().trim().messages({
      "string.min": "A kérdésnek legalább 1 karakter hosszúnak kell lennie!",
      "string.max": "A kérdés hossza maximum 256 karakter lehet!",
      "any.required": `"A kérdés mező kötelező!`,
    }),
    questionEn: Joi.string().min(1).max(256).required().trim().messages({
      "string.min": "A questionnek legalább 1 karakter hosszúnak kell lennie!",
      "string.max": "A question hossza maximum 256 karakter lehet!",
      "any.required": `"A question mező kötelező!`,
    }),
    answerHu: Joi.string().min(1).max(1024).required().trim().messages({
      "string.min": "A válasznak legalább 1 karakter hosszúnak kell lennie!",
      "string.max": "A válasz hossza maximum 1024 karakter lehet!",
      "any.required": `"A válasz mező kötelező!`,
    }),
    answerEn: Joi.string().min(1).max(1024).required().trim().messages({
      "string.min": "Az answernek legalább 1 karakter hosszúnak kell lennie!",
      "string.max": "Az answer hossza maximum 1024 karakter lehet!",
      "any.required": `"Az answer mező kötelező!`,
    }),
  });
  return schema.validate(data);
};
export default createEditFaqValidation;
