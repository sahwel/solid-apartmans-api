import { Router } from "express";
import ReservationController from "../controller/ReservationController";

const router = Router();

router.post("/:id", ReservationController.makeReservation);

export default router;
