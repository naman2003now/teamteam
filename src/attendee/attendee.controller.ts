import Controller from "../interfaces/controller.interface";
import { Router, Response, Request } from "express";
import AttendeeModel from "./attendee.model";

export default class Attendee implements Controller {
  path = "/attendee";
  router = Router();

  constructor() {
    this.initilizeRoutes();
  }

  private initilizeRoutes() {
    this.router.post("/create", this.createAttendee);
    this.router.get(
      "/serialNumber/:serialNumber",
      this.getAttendeeBySerialNumber,
    );
    this.router.get(
      "/phoneNumber/:phoneNumber",
      this.getAttendeeByPhoneNumber,
    );
  }

  private async createAttendee(req: Request, res: Response) {
    try {
      const attendee = await AttendeeModel.create(req.body);
      res.status(201).send(attendee);
    } catch (error) {
      res.status(401).send(error);
    }
  }

  private async getAttendeeBySerialNumber(
    req: Request,
    res: Response,
  ) {
    const serialNumber = req.params.serialNumber;
    try {
      const attendee = await AttendeeModel.findOne({ serialNumber });
      if (attendee) {
        res.status(200).send(attendee);
      } else {
        res.status(404).send({ message: "Attendee not found" });
      }
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  }

  private async getAttendeeByPhoneNumber(
    req: Request,
    res: Response,
  ) {
    const phoneNumber = req.params.phoneNumber;
    try {
      const attendee = await AttendeeModel.findOne({ phoneNumber });
      if (attendee) {
        res.status(200).send(attendee);
      } else {
        res.status(404).send({ message: "Attendee not found" });
      }
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  }
}
