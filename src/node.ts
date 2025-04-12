import { createServer } from "node:http";
// @ts-ignore
import { URLPattern } from "node:url";
import { type ServerAdapterRequestHandler, createServerAdapter } from "@whatwg-node/server";
import { app } from "./app.ts";

// Patch until URLPattern is available in globalThis in node 24
// @ts-ignore
globalThis.URLPattern = URLPattern;

const server = createServer(
  createServerAdapter(app.fetch as unknown as ServerAdapterRequestHandler<unknown>),
);
server.listen(8000);
