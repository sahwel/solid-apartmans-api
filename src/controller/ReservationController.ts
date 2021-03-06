import ReservationServices from "../services/ReservationServices";
import { Request, Response } from "express";
class ReservationController {
  async makeReservation(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await ReservationServices.create(id, req.body);
      res.status(response.status).json(response.payload);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }

  async getAdmin(req: Request, res: Response) {
    try {
      const response = await ReservationServices.getAdmin(req.query);
      res.status(response.status).json(response.payload);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }

  async getFreeTimeEnd(req: Request, res: Response) {
    try {
      const response = await ReservationServices.getFreeTimeEnd(req.query);
      res.status(response.status).json(response.payload);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }

  async get(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await ReservationServices.get(id);
      res.status(response.status).json(response.payload);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }

  async setPayed(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const response = await ReservationServices.setPayed(id);
      res.status(response.status).json(response.payload);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }

  async getTotal(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const arrive = req.params.arrive as unknown as Date;
      const leave = req.params.leave as unknown as Date;
      const numbersOfAdults = req.params.numbersOfAdults as unknown as number;
      const numbersOfChilds = req.params.numbersOfChilds as unknown as number;
      const response = await ReservationServices.getTotalAsync(id, arrive, leave, numbersOfAdults, numbersOfChilds);
      res.status(response.status).json(response.payload);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }
}

export default new ReservationController();
