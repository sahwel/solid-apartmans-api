export interface LoginAdminDto {
  email: string;
  password: string;
}

export interface RegisterAdminDto {
  email: string;
  password: string;
  re_password: string;
  name: string;
}

export interface AdminModel {
  _id: string;
  email: string;
  password: string;
  name: string;
  save: Function;
}
