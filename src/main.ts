import http from "node:http";
import { Application } from "../framework/Application.ts";
import { serve } from "../framework/adapters/node.ts";
import { GetEventController } from "./infrastructure/controllers/GetEventController.ts";
import { GetEventsController } from "./infrastructure/controllers/GetEventsController.ts";
import { PostEventController } from "./infrastructure/controllers/PostEventController.ts";

const app = new Application([
  GetEventController,
  GetEventsController,
  PostEventController,
]);

const server = http.createServer();
server.listen(3000);

await serve({
  app,
  server,
});
