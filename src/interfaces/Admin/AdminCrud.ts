import ApiResponse from "../../models/ApiResponse";
import { LoginAdminDto, RegisterAdminDto } from "./AdminDtos";

export interface ADMINCRUD {
  login: (loginData: LoginAdminDto) => Promise<ApiResponse>;
  register: (registerData: RegisterAdminDto) => Promise<ApiResponse>;
}
