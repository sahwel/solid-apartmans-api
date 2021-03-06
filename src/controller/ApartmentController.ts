import apartmentService from "../services/ApartmentService";
import { Request, Response } from "express";
class AdminController {
  async create(req: Request, res: Response) {
    try {
      const response = await apartmentService.create(req.body, req.files as Express.Multer.File[]);
      res.status(response.status).json(response.payload);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }

  async addImages(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await apartmentService.addImages(id, req.files as Express.Multer.File[]);
      res.status(response.status).json(response.payload);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await apartmentService.update(id, req.body);
      res.status(response.status).json(response.payload);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }

  async getAdminHome(req: Request, res: Response) {
    try {
      const response = await apartmentService.getAdminHome();
      res.status(response.status).json(response.payload);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }

  async getAdmin(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await apartmentService.getAdmin(id);
      res.status(response.status).json(response.payload);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }

  async get(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await apartmentService.get(id);
      res.status(response.status).json(response.payload);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }

  async getHome(req: Request, res: Response) {
    try {
      const response = await apartmentService.getHome();
      res.status(response.status).json(response.payload);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }

  async getBookDatas(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await apartmentService.getBookDatas(id);
      res.status(response.status).json(response.payload);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }

  async deleteImage(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const index = req.params.index;
      const response = await apartmentService.deleteImage(id, parseInt(index));
      res.status(response.status).json(response.payload);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }

  async moveImg(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const index = req.params.index;
      const isUp = req.params.isUp;
      const toFirst = req.params.toFirst;
      const response = await apartmentService.moveImg(id, parseInt(index), isUp === "true", toFirst === "true");
      res.status(response.status).json(response.payload);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await apartmentService.delete(id);
      res.status(response.status).json(response.payload);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }

  async getApartmentsNames(req: Request, res: Response) {
    try {
      const response = await apartmentService.getApartmentsNames();
      res.status(response.status).json(response.payload);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }
}

export default new AdminController();
