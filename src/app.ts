import { Application } from "../framework/Application.ts";
import type { AnyController } from "../framework/Controller.ts";
import { CreateSpeaker } from "./application/CreateSpeaker.ts";
import { GetSpeakerController } from "./infrastructure/controllers/GetSpeakerController.ts";
import { GetSpeakersController } from "./infrastructure/controllers/GetSpeakersController.ts";
import { PostSpeakerController } from "./infrastructure/controllers/PostSpeakerController.ts";

const controllers = [
  GetSpeakerController.create(),
  GetSpeakersController.create(),
  PostSpeakerController.create(new CreateSpeaker()),
] as AnyController[];

export const app = new Application(controllers);
