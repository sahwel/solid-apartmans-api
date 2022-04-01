import { Router } from "express";
import FacilityController from "../controller/FacilityController";
import getAdmin from "../middlewares/GetAdmin";
import validateAdminToken from "../middlewares/ValidateAdminToken";
import MulterSerivce from "../services/Multer";
const router = Router();

router.post("/", validateAdminToken, getAdmin, MulterSerivce.upload.single("file"), FacilityController.create);
router.patch("/:id", validateAdminToken, getAdmin, MulterSerivce.upload.single("file"), FacilityController.update);
router.delete("/:id", validateAdminToken, getAdmin, FacilityController.delete);
router.get("/", validateAdminToken, getAdmin, FacilityController.getAll);

export default router;
