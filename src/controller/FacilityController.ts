import facilityService from "../services/FacilityService";
import { Request, Response } from "express";
class FacilityController {
  async create(req: Request, res: Response) {
    try {
      const response = await facilityService.create(req.body, req.file);
      res.status(response.status).json(response.payload);
    } catch (error) {
      //Logger.error(error);
      res.json(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const apiResponse = await facilityService.update(id, req.body, req.file);
      res.status(apiResponse.status).json(apiResponse.payload);
    } catch (error) {
      // Logger.error(error);
      res.json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id
      const apiResponse = await facilityService.delete(id);
      res.status(apiResponse.status).json(apiResponse.payload);
    } catch (error) {
      // Logger.error(error);
      res.json(error);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const apiResponse = await facilityService.getAll();
      res.status(apiResponse.status).json(apiResponse.payload);
    } catch (error) {
      // Logger.error(error);
      res.json(error);
    }
  }
}

export default new FacilityController();
