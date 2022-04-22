import { Router } from "express";
import ReservationController from "../controller/ReservationController";
import getAdmin from "../middlewares/GetAdmin";
import validateAdminToken from "../middlewares/ValidateAdminToken";

const router = Router();

router.post("/:id", ReservationController.makeReservation);
router.get("/freeTimeEnd", ReservationController.getFreeTimeEnd);
router.get("/admin/", validateAdminToken, getAdmin, ReservationController.getAdmin);
router.get("/:id", ReservationController.get);
router.patch("/:id", validateAdminToken, getAdmin, ReservationController.setPayed);

export default router;
