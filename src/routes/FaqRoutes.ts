import { Router } from "express";
import FaqController from "../controller/FaqController";
import getAdmin from "../middlewares/GetAdmin";
import validateAdminToken from "../middlewares/ValidateAdminToken";
const router = Router();

router.post("/", validateAdminToken, getAdmin, FaqController.create);

router.patch("/:id", validateAdminToken, getAdmin, FaqController.update);

router.get("/", FaqController.get);

router.delete("/:id", validateAdminToken, getAdmin, FaqController.delete);

export default router;
