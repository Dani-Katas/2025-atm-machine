import http from "node:http";
import { serve } from "../framework/adapters/node.ts";
import { app } from "./app.ts";

const server = http.createServer();
server.listen(3000);

await serve({
  app,
  server,
});
