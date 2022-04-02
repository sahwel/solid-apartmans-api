export interface AdminModel {
  _id: string;
  email: string;
  password: string;
  name: string;
  save: Function;
}

export interface TokenModel {
  _id: string;
  exp: Date;
}
