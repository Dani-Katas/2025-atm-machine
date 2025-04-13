import { app } from "./app.ts";

// @ts-ignore
Bun.serve({ fetch: app.fetch });
