import Joi from "joi";
import { ApartmentDto } from "../../interfaces/Apartment/AparmentDtos";

const validateApartment = (data: ApartmentDto) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(64).required().trim().messages({
      "string.min": "A névnek legalább 1 karakter hosszúnak kell lennie!",
      "string.max": "A név hossza maximum 64 karakter lehet!",
      "any.required": `"A név mező kötelező!`,
    }),
    address: Joi.object()
      .required()
      .keys({
        city: Joi.string().min(1).max(128).required().trim().messages({
          "string.min": "A városnak legalább 1 karakter hosszúnak kell lennie!",
          "string.max": "A város hossza maximum 128 karakter lehet!",
          "any.required": `"A város mező kötelező!`,
        }),
        zip_code: Joi.string().min(1).max(32).required().trim().messages({
          "string.min": "Az irányítószámnak legalább 1 karakter hosszúnak kell lennie!",
          "string.max": "Az irányítószám hossza maximum 32 karakter lehet!",
          "any.required": `"Az irányítószám mező kötelező!`,
        }),
        street: Joi.string().min(1).max(256).required().trim().messages({
          "string.min": "Az utcanák legalább 1 karakter hosszúnak kell lennie!",
          "string.max": "Az utca hossza maximum 256 karakter lehet!",
          "any.required": `"Az utca mező kötelező!`,
        }),
        house_number: Joi.string().min(1).max(256).required().trim().messages({
          "string.min": "A házszámnak legalább 1 karakter hosszúnak kell lennie!",
          "string.max": "A házszám hossza maximum 256 karakter lehet!",
          "any.required": `"A házszám mező kötelező!`,
        }),
      }),
    capacity: Joi.object()
      .required()
      .keys({
        bedrooms: Joi.string().min(1).max(128).required().trim().messages({
          "string.min": "A szobák számának legalább 1 karakter hosszúnak kell lennie!",
          "any.required": `"A szobák száma kötelező!`,
        }),
        capacity: Joi.string().min(1).max(32).required().trim().messages({
          "string.min": "A férőhelyek számának legalább 1 karakter hosszúnak kell lennie!",
          "any.required": `"A férőhelyek száma mező kötelező!`,
        }),
      }),
    detailsEN: Joi.string().min(1).max(1024).required().trim().messages({
      "string.min": "Az angol leírásnak legalább 1 karakter hosszúnak kell lennie!",
      "string.max": "Az angol leírás hossza maximum 1024 karakter lehet!",
      "any.required": `"Az angol leírás kötelező!`,
    }),
    detailsHU: Joi.string().min(1).max(1024).required().trim().messages({
      "string.min": "A magyar leírásnak legalább 1 karakter hosszúnak kell lennie!",
      "string.max": "A magyar leírás hossza maximum 1024 karakter lehet!",
      "any.required": `"A magyar leírás kötelező!`,
    }),
    plusPrice: Joi.number().min(1).required().messages({
      "number.min": "A plusz ár/fő-nek legalább 1 karakter hosszúnak kell lennie!",
      "any.required": `"A plusz ár/fő kötelező!`,
      "number.base": "A plusz ár/fő-nek számnak kell lennie!",
    }),
    price: Joi.number().min(1).required().messages({
      "number.min": "Az Ár 1 fő/éjszakának legalább 1 karakter hosszúnak kell lennie!",
      "any.required": `"Az Ár 1 fő/éjszaka mező kötelező!`,
      "number.base": "Az Ár 1 fő/éjszaka számnak kell lennie!",
    }),
    facilities: Joi.array().min(1).required().messages({
      "array.min": "Leglalább 1 felszereltséget meg kell adni!",
      "any.required": `"Az apartman felszereltségét kötelező megadni!`,
    }),
  });
  return schema.validate(data);
};
export default validateApartment;
