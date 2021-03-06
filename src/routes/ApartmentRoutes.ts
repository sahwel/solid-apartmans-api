import { Router } from "express";
import ApartmentController from "../controller/ApartmentController";
import getAdmin from "../middlewares/GetAdmin";
import validateAdminToken from "../middlewares/ValidateAdminToken";
import MulterSerivce from "../services/Multer";

const router = Router();

router.post("/", validateAdminToken, getAdmin, MulterSerivce.upload.array("images", 100), ApartmentController.create);
router.patch("/:id", validateAdminToken, getAdmin, ApartmentController.update);
router.patch(
  "/image/:id",
  validateAdminToken,
  getAdmin,
  MulterSerivce.upload.array("images", 100),
  ApartmentController.addImages
);
router.get("/admin/home", validateAdminToken, getAdmin, ApartmentController.getAdminHome);
router.get("/admin/:id", validateAdminToken, getAdmin, ApartmentController.getAdmin);
router.delete("/image/:id/:index", validateAdminToken, getAdmin, ApartmentController.deleteImage);
router.get("/options", validateAdminToken, getAdmin, ApartmentController.getApartmentsNames);
router.patch("/image/:id/:index/:isUp/:toFirst", validateAdminToken, getAdmin, ApartmentController.moveImg);
router.get("/:id", ApartmentController.get);
router.get("/", ApartmentController.getHome);
router.get("/book/datas/:id", ApartmentController.getBookDatas);
router.delete("/:id", validateAdminToken, getAdmin, ApartmentController.delete);

export default router;
