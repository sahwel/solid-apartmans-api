import mongoose from "mongoose";
import * as dotenv from "dotenv";
import Logger from "./loggers/Logger";
import express, { Application, Request, Response, NextFunction } from "express";
import ApiResponse from "./models/ApiResponse";
dotenv.config();
const app: Application = express();

const db_uri = process.env.DB_URI;

mongoose
  .connect(db_uri || "")
  .then(() => Logger.info("connected to db!"))
  .catch((err: Error) => Logger.error(err.message));

app.use(express.json());
import cors from "cors";
app.use(cors());

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
  Logger.info(`Server started at host: 'port: ${process.env.HOST}: ${process.env.PORT || 8080}'`);
});

declare global {
  namespace Express {
    interface Request {
      userId?: string /* 
      user?: UserModel; */;
    }
  }
}
