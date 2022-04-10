import { unlink } from "fs";

class ImageService {
  deleteImgs(imgs: Express.Multer.File[]) {
    imgs.forEach((img) => {
      unlink(img.path, function (err) {});
    });
  }

  deleteImg(path: string) {
    unlink(path, function (err) {});
  }
}

export default new ImageService();
