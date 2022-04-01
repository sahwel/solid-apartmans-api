import { Request } from "express";

import multer from "multer";

class MulterSerivce {
  storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: Function) => {
      cb(null, ".public/");
    },
    filename: (req: Request, file: Express.Multer.File, cb: Function) => {
      cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
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

//solid-apartmans-api.vercel.app/facility/
