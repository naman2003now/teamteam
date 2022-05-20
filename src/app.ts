import express, { Express, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import {
  PORT,
  DATABASE_URL,
  DATABASE_NAME,
} from "./config/app.config";

export default class App {
  app: Express = express();

  constructor() {
    this.useMiddlewares();
    this.connectToDatabase();
    this.initHomeRoute();

    //Listen
    this.app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  }

  private initHomeRoute() {
    this.app.get("/", (req: Request, res: Response) => {
      res.send({ message: "Bunty ka saabun slow hai!" });
    });
  }

  private useMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private connectToDatabase() {
    mongoose.connect(DATABASE_URL, () => {
      console.log(`Connected to database: ${DATABASE_NAME}`);
    });
  }
}
