import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { TokenModel } from "../interfaces/Admin/Definitions";

const validateAdminToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("auth-token");

  if (!token)
    return res
      .status(401)
      .json({ msg: "Access denied, please sign in first! (Hozzáférés megtagadva, jelentkezz be előbb!)" });

  try {
    const verified = jwt.verify(token, process.env.ADMIN_TOKEN + "");
    const tokenModel = verified as TokenModel;
    if (new Date(tokenModel.expire) < new Date())
      return res
        .status(401)
        .json({ msg: "Access denied, please sign in first! (Hozzáférés megtagadva, jelentkezz be előbb!)" });

    const id = (verified as any)._id;
    req.adminId = id;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Invalid Token" });
  }
};
export default validateAdminToken;
