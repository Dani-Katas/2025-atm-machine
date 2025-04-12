import { Application } from "../framework/Application.ts";
import type { AnyController } from "../framework/Controller.ts";
import { GetEventController } from "./infrastructure/controllers/GetEventController.ts";
import { GetEventsController } from "./infrastructure/controllers/GetEventsController.ts";
import { PostEventController } from "./infrastructure/controllers/PostEventController.ts";

const controllers = [
  GetEventController,
  GetEventsController,
  PostEventController,
] as AnyController[];

export const app = new Application(controllers);
