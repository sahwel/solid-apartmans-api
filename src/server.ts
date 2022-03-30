import mongoose from "mongoose";
import * as dotenv from "dotenv";
import express, { Application, Request, Response, NextFunction } from "express";
import ApiResponse from "./models/ApiResponse";
import userRoutes from "./routes/UserRoutes";
import compression from "compression";
dotenv.config();
const app: Application = express();

const db_uri = process.env.DB_URI;

mongoose
  .connect(db_uri || "")
  .then(() => console.info("connected to db!"))
  .catch((err: Error) => console.error(err.message));

app.use(express.json());
import cors from "cors";
app.use(cors());
app.use(compression());
app.use("/user", userRoutes);
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
  console.info(`Server started at host: 'port: ${process.env.HOST}: ${process.env.PORT || 8080}'`);
});

declare global {
  namespace Express {
    interface Request {
      userId?: string /* 
      user?: UserModel; */;
    }
  }
}
