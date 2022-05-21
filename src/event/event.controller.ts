import Controller from "../interfaces/controller.interface";
import { Router, Request, Response } from "express";
import EventModel from "./event.model";

export default class Event implements Controller {
  path = "/event";
  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/username/:username", this.getEventByUsername);

    this.router.post("/create", this.createEvent);
  }

  private async createEvent(req: Request, res: Response) {
    try {
      const event = await EventModel.create(req.body);
      res.status(201).send(event);
    } catch (error) {
      res.status(401).send(error);
    }
  }

  private async getEventByUsername(req: Request, res: Response) {
    const { username } = req.params;
    try {
      const event = await EventModel.findOne({ username });
      if (event) {
        res.status(200).send(event);
      } else {
        res.status(404).send({ message: "Event not found" });
      }
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  }
}
