import type http from "node:http";
import type { IncomingMessage, ServerResponse } from "node:http";

type RequestPair = {
  req: IncomingMessage;
  res: ServerResponse;
};

export function createServerIterator(
  server: http.Server,
): AsyncIterable<RequestPair> {
  const requests: RequestPair[] = [];
  const resolvers: ((value: RequestPair) => void)[] = [];

  server.on("request", (req, res) => {
    const pair: RequestPair = { req, res };
    const resolve = resolvers.shift();

    if (resolve) {
      resolve(pair);
    } else {
      requests.push(pair);
    }
  });

  return {
    [Symbol.asyncIterator]() {
      return {
        async next(): Promise<IteratorResult<RequestPair>> {
          const request = requests.shift();
          if (request) {
            return { value: request, done: false };
          }
          return new Promise((resolve) => {
            resolvers.push((value) => resolve({ value, done: false }));
          });
        },
      };
    },
  };
}
