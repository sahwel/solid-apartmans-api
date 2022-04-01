import { json, Request, Response, Router } from "express";
import AdminController from "../controller/AdminController";
const router = Router();

router.post("/login", AdminController.login);
router.post("/register", AdminController.register);

export default router;
