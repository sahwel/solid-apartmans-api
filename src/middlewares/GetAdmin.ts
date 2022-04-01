import Admin from "../models/Entity/Admin";
import { Request, Response, NextFunction } from "express";

const getAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const adminId = req.adminId;
    let admin = await Admin.findById(adminId).select("email name _id ");

    if (!admin) return res.status(403).json({ msg: "Access denied! (Hozzáférés megtagadva!)" });

    req.admin = admin;

    next();
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

export default getAdmin;
