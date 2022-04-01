import { Request, Response } from "express";
import FaqService from "../services/FaqService";
class FaqController {
  async create(req: Request, res: Response) {
    try {
      const response = await FaqService.create(req.body);
      res.status(response.status).json(response.payload);
    } catch (error) {
      //Logger.error(error);
      res.json(error);
    }
  }

  async getAdmin(req: Request, res: Response) {
    try {
      const response = await FaqService.getAdmin();
      res.status(response.status).json(response.payload);
    } catch (error) {
      //Logger.error(error);
      res.json(error);
    }
  }

  async get(req: Request, res: Response) {
    try {
      const response = await FaqService.get(req);
      res.status(response.status).json(response.payload);
    } catch (error) {
      //Logger.error(error);
      res.json(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await FaqService.update(id, req.body);
      res.status(response.status).json(response.payload);
    } catch (error) {
      //Logger.error(error);
      res.json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await FaqService.delete(id);
      res.status(response.status).json(response.payload);
    } catch (error) {
      //Logger.error(error);
      res.json(error);
    }
  }
}

export default new FaqController();
