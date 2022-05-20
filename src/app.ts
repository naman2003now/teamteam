import express, { Express, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import {
  PORT,
  DATABASE_URL,
  DATABASE_NAME,
} from "./config/app.config";
import Controller from "./interfaces/controller.interface";

export default class App {
  app: Express = express();

  constructor(controllers: Controller[]) {
    this.useMiddlewares();
    this.connectToDatabase();
    this.initHomeRoute();
    this.initilizeControllers(controllers);

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

  private initilizeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use(controller.path, controller.router);
    });
  }

  private connectToDatabase() {
    mongoose.connect(DATABASE_URL, () => {
      console.log(`Connected to database: ${DATABASE_NAME}`);
    });
  }
}
