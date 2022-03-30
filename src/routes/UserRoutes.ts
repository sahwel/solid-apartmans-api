import { json, Request, Response, Router } from "express";
const router = Router();

router.get("/login", (req: Request, res: Response) => res.json({ asd: "asd" }));

export default router;
