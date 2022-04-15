import { Router } from "express";
import ReservationController from "../controller/ReservationController";
import getAdmin from "../middlewares/GetAdmin";
import validateAdminToken from "../middlewares/ValidateAdminToken";

const router = Router();

router.post("/:id", ReservationController.makeReservation);

router.get("/admin/", validateAdminToken, getAdmin, ReservationController.getAdmin);

router.get("/freeTimeEnd/:id", validateAdminToken, getAdmin, ReservationController.getFreeTimeEnd);

export default router;
