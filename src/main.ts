import { createServer } from "node:http";
import { type ServerAdapterRequestHandler, createServerAdapter } from "@whatwg-node/server";
import { app } from "./app.ts";

const server = createServer(
  createServerAdapter(app.fetch as unknown as ServerAdapterRequestHandler<unknown>),
);
server.listen(3000);
