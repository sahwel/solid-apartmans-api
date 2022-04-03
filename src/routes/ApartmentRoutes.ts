import { Router } from "express";
import ApartmentController from "../controller/ApartmentController";
import getAdmin from "../middlewares/GetAdmin";
import validateAdminToken from "../middlewares/ValidateAdminToken";
import MulterSerivce from "../services/Multer";

const router = Router();

router.post("/", validateAdminToken, getAdmin, MulterSerivce.upload.array("images", 100), ApartmentController.create);
router.get("/admin/home", validateAdminToken, getAdmin, ApartmentController.getAdminHome);
router.get("/admin/:id", validateAdminToken, getAdmin, ApartmentController.getAdmin);
router.get("/:id", ApartmentController.get);
router.get("/", ApartmentController.getHome);

export default router;
