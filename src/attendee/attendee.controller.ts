import Controller from "../interfaces/controller.interface";
import { Router, Response, Request } from "express";
import AttendeeModel from "./attendee.model";

export default class Attendee implements Controller {
  path = "/attendee";
  router = Router();

  constructor() {}

  private initilizeRoutes() {
    this.router.post("/create", this.createAttendee);
  }

  private async createAttendee(res: Response, req: Request) {
    const { name, email, phoneNumber, serialNumber } = req.body;
    try {
      const attendee = await AttendeeModel.create({
        name,
        email,
        phoneNumber,
        serialNumber,
      });
      res.status(201).send(attendee);
    } catch (error) {
      res.status(401).send(error);
    }
  }

  private async getAttendeeBySerialNumber(
    res: Response,
    req: Request,
  ) {
    const { serialNumber } = req.params;
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
    res: Response,
    req: Request,
  ) {
    const { phoneNumber } = req.params;
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
