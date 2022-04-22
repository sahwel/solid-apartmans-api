import { NextFunction, Request } from "express";
import path from "path";
import multer from "multer";

class MulterSerivce {
  storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: Function) => {
      cb(null, path.join(__dirname, "../uploads/"));
    },
    filename: (req: Request, file: Express.Multer.File, cb: Function) => {
      cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
  });

  fileFilter = (req: Request, file: Express.Multer.File, cb: Function) => {
    if ((file.mimetype + "").startsWith("image/")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  upload = multer({
    storage: this.storage,

    limits: {
      fileSize: 1024 * 1024 * 5,
    },
    fileFilter: this.fileFilter,
  });
}

export default new MulterSerivce();
