import App from "./app";
import EventController from "./event/event.controller";
import AttendeeController from "./attendee/attendee.controller";

const app = new App([
  new EventController(),
  new AttendeeController(),
]);
