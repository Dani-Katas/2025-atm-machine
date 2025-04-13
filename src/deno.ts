import { app } from "./app.ts";

// @ts-ignore
Deno.serve(app.fetch);
