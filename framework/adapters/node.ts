import type { IncomingHttpHeaders, IncomingMessage, Server } from "node:http";
import { Readable } from "node:stream";
import type { ReadableStream as WebReadableStream } from "node:stream/web";
import type { Application } from "../Application.ts";
import { HTTPMethod } from "../HTTPMethod.ts";
import { createServerIterator } from "../createServerIterator.ts";

export async function serve({ app, server }: { app: Application; server: Server }) {
  for await (const { req, res } of createServerIterator(server)) {
    const url = req.url;
    const method = req.method;
    const isQuery = method === HTTPMethod.GET || method === HTTPMethod.HEAD;
    const request = new Request(`http://localhost${url}`, {
      method,
      headers: toHeaders(req.headers),
      body: isQuery ? null : (req as unknown as ReadableStream),
      // @ts-ignore
      duplex: "half",
    });

    const response = await app.fetch(request);

    const body = response.body as unknown as WebReadableStream<unknown> | null;
    if (body) {
      Readable.fromWeb(body).pipe(res);
    } else {
      res.end();
    }
  }
}

function toHeaders(headers: IncomingHttpHeaders): Headers {
  const result = new Headers();

  for (const [key, value] of Object.entries(headers)) {
    if (typeof value === "string") {
      result.set(key, value);
    } else if (Array.isArray(value)) {
      for (const v of value) {
        result.append(key, v);
      }
    }
  }

  return result;
}
