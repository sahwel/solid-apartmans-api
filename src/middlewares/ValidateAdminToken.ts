import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { TokenModel } from "../interfaces/Admin/Definitions";

const validateAdminToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("auth-token");

    if (!token)
      return res
        .status(401)
        .json({ msgEN: "Access denied, please sign in first!", msgHU: "Hozzáférés megtagadva, jelentkezz be előbb!" });

    const verified = jwt.verify(token, process.env.ADMIN_TOKEN + "");
    const tokenModel = verified as JwtPayload;

    const id = tokenModel._id;
    req.adminId = id;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Invalid Token" });
  }
};
export default validateAdminToken;
