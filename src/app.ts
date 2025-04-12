import { Application } from "../framework/Application.ts";
import { GetEventController } from "./infrastructure/controllers/GetEventController.ts";
import { GetEventsController } from "./infrastructure/controllers/GetEventsController.ts";
import { PostEventController } from "./infrastructure/controllers/PostEventController.ts";

export const app = new Application([GetEventController, GetEventsController, PostEventController]);
