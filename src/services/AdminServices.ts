import { LoginAdminDto, RegisterAdminDto } from "../interfaces/Admin/AdminDtos";
import { ADMINCRUD } from "../interfaces/Admin/AdminCrud";
import Admin from "../models/Entity/Admin";
import bcrypt from "bcrypt";
import ApiResponse from "../models/ApiResponse";
import jwt from "jsonwebtoken";
import registerAdminValidation from "../validation/Admin/AdminRegisterValidation";

class AdminServices implements ADMINCRUD {
  async login(loginData: LoginAdminDto) {
    try {
      const admin = await Admin.findOne({ name: loginData.email });
      if (!admin) return new ApiResponse({ msg: "Helytelen email cím vagy jelszó!" }, 400);

      const validPassword = await bcrypt.compare(loginData.password, admin.password);

      if (!validPassword) return new ApiResponse({ msg: "Helytelen email cím vagy jelszó!" }, 400);
      const tokenExpire = process.env.TOKEN_EXPIRE ? parseInt(process.env.TOKEN_EXPIRE) : 3600000;
      const expireDate = new Date(new Date().getTime() + tokenExpire);
      if (!process.env.ADMIN_TOKEN) {
        throw "Token for jwt is not found!";
      }
      const token = jwt.sign(
        {
          _id: admin._id,
          expire: expireDate,
        },
        process.env.ADMIN_TOKEN
      );
      return new ApiResponse({
        token: token,
      });
    } catch (error) {
      throw error;
    }
  }

  async register(registerData: RegisterAdminDto) {
    try {
      const dataValidation = registerAdminValidation(registerData);
      if (dataValidation.error)
        return new ApiResponse(
          {
            msg: dataValidation.error.details[0].message,
          },
          400
        );

      const email = registerData.email;
      const emailExist = await Admin.exists({ email: email });
      if (emailExist) return new ApiResponse({ msg: "Ez az email már foglalt!" }, 400);
      const emailRegex =
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

      if (!email.match(emailRegex))
        return new ApiResponse(
          {
            msg: "Kérlek adj meg egy létező email címet!",
          },
          400
        );

      const password = registerData.password;
      if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/))
        return new ApiResponse(
          {
            msg: "A jelszónak tartalmaznia kell legalább 1 nagy, egy kisbetűt, legalább 1 számot és legalább 8 karakter hosszúnak kell lennie!",
          },
          400
        );

      const re_password = registerData.re_password;
      if (re_password !== password) return new ApiResponse({ msg: "A két jelszónak meg kell egyeznie!" }, 400);
      const hashedPassword = await bcrypt.hash(password, 10);

      await Admin.create({
        email: email,
        password: hashedPassword,
        name: registerData.name,
      });
      return new ApiResponse();
    } catch (error) {
      throw error;
    }
  }
}

export default new AdminServices();
