import Joi from "joi";
import { FacilityDto } from "../../interfaces/Apartment/AparmentDtos";

const validateFacility = (data: FacilityDto) => {
  const schema = Joi.object({
    nameEN: Joi.string().min(1).max(64).required().trim().messages({
      "string.min": "Az angol névnek legalább 1 karakter hosszúnak kell lennie!",
      "string.max": "Az angol név hossza maximum 64 karakter lehet!",
      "any.required": `"Az angol név mező kötelező!`,
    }),
    nameHU: Joi.string().min(1).max(64).required().trim().messages({
      "string.min": "A magyar névnek legalább 1 karakter hosszúnak kell lennie!",
      "string.max": "A magyar név hossza maximum 64 karakter lehet!",
      "any.required": `"A magyar név mező kötelező!`,
    }),
  });
  return schema.validate(data);
};
export default validateFacility;
