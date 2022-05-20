import App from "./app";
import EventController from "./event/event.controller";

const app = new App([new EventController()]);
