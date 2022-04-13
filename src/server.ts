import mongoose from "mongoose";
import * as dotenv from "dotenv";
import express, { Application, Request, Response, NextFunction } from "express";
import ApiResponse from "./models/ApiResponse";
import adminRoutes from "./routes/AdminRoutes";
import apartmentRoutes from "./routes/ApartmentRoutes";
import faqRoutes from "./routes/FaqRoutes";
import path from "path";
import facilityRoutes from "./routes/FacilityRoutes";
import reservationRoutes from "./routes/ReservationRoutes";
import compression from "compression";
import cors from "cors";
import { AdminModel } from "./interfaces/Admin/Definitions";
dotenv.config();
const app: Application = express();

//todo: Research: how logging works on vercel, replace all cosnole.log !!!!!

const db_uri = process.env.DB_URI;

mongoose
  .connect(db_uri || "")
  .then(() => console.info("connected to db!"))
  .catch((err: Error) => console.error(err.message));

require("./models/Entity/Review");
require("./models/Entity/Facility");
require("./models/Entity/Reservation");
app.use(express.json());

app.use(cors({ origin: "*" }));

app.use(compression());

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
console.log(__dirname);

app.use("/admin", adminRoutes);
app.use("/faq", faqRoutes);
app.use("/facility", facilityRoutes);
app.use("/reservation", reservationRoutes);
app.use("/apartment", apartmentRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error: ApiResponse = new ApiResponse({ msg: "Not found" }, 404);
  next(error);
});

app.use((error: ApiResponse, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500);
  res.json({
    error: {
      status: error.status,
      errors: error.payload,
    },
  });
});

app.listen(process.env.PORT || 8080, () => {
  console.info(
    `Server started. Environment: ${process.env.NODE_ENV}, host: ${process.env.HOST}, port: ${process.env.PORT || 8080}`
  );
});

declare global {
  namespace Express {
    interface Request {
      adminId?: string;
      admin?: AdminModel;
    }
  }
}
