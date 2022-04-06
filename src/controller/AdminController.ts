import adminServices from "../services/AdminServices";
import { Request, Response } from "express";
class AdminController {
  async login(req: Request, res: Response) {
    try {
      const response = await adminServices.login(req.body);
      res.status(response.status).json(response.payload);
    } catch (error) {
      console.log(error)
      res.json(error);
    }
  }
  async register(req: Request, res: Response) {
    try {
      const apiResponse = await adminServices.register(req.body);
      res.status(apiResponse.status).json(apiResponse.payload);
    } catch (error) {
      console.log(error)
      res.json(error);
    }
  }
}

export default new AdminController();
