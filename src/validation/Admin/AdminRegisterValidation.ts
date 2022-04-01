import Joi from "joi";
import { RegisterAdminDto } from "../../interfaces/Admin/AdminDtos";

const registerAdminValidation = (data: RegisterAdminDto) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(256).required().trim(),
    password: Joi.string().min(8).max(256).required().trim(),
    re_password: Joi.string().min(8).max(256).required().trim(),
    name: Joi.string().min(6).max(128).required().trim(),
  });
  return schema.validate(data);
};
export default registerAdminValidation;
