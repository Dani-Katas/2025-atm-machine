# Homemade Framework for HTTP Applications

This is a lightweight, homemade framework for building HTTP applications in TypeScript. It provides a simple structure for defining controllers, handling requests, and managing responses.

## Features

- **Controller-based architecture**: Define controllers with strict type validation using `zod`.
- **Request and response handling**: Built-in support for parsing parameters, request bodies, and generating structured responses.
- **Error handling**: Graceful handling of validation errors, syntax errors, and unknown errors.
- **Cross-platform support**: Works with Node.js, Deno, and Bun.

## Project Structure

- **`framework/`**: Core framework components, including `Application`, `Controller`, and HTTP utilities.
- **`src/infrastructure/controllers/`**: Example controllers for handling HTTP routes.
- **`src/app.ts`**: Application instance with registered controllers.
- **`src/`**: Entry points for different runtimes (`node.ts`, `deno.ts`, `bun.ts`).

## Getting Started

### Prerequisites

- Node.js (v18 or later) / Deno / Bun
- TypeScript

### Installation

Clone the repository:

```bash
git clone git@github.com:DanielRamosAcosta/framework.git
cd framework
```

Install dependencies (for Node.js or Bun):

```bash
npm install
```

### Usage

1. **Define Controllers**: Create controllers in the `src/infrastructure/controllers/` directory. Each controller specifies a route, HTTP method, and handler logic.

Example: `GetEventController.ts`
```typescript
import { z } from "zod";
import { HTTPMethod } from "../../../framework/HTTPMethod.ts";
import type { Controller } from "../../../framework/Controller.ts";
import { HTTPStatus } from "../../../framework/HTTPStatus.ts";

const Params = z.object({});
const RequestBody = z.undefined();
const ResponseBody = z.object({
  id: z.string().uuid(),
  name: z.string(),
});

export const GetEventController: Controller<...> = {
  path: "/api/events/:id",
  method: HTTPMethod.GET,
  params: Params,
  requestBody: RequestBody,
  responseBody: ResponseBody,
  handler: async (data) => {
    return {
      status: HTTPStatus.OK,
      json: { id: "example-id", name: "Example Event" },
    };
  },
};
```

2. **Register Controllers**: Add controllers to the `Application` instance in `src/app.ts`.

```typescript
import { Application } from "../framework/Application.ts";
import { GetEventController } from "./infrastructure/controllers/GetEventController.ts";
import { GetEventsController } from "./infrastructure/controllers/GetEventsController.ts";
import { PostEventController } from "./infrastructure/controllers/PostEventController.ts";

export const app = new Application([GetEventController, GetEventsController, PostEventController]);
```

3. **Start the Server**: Use the appropriate entry point for your runtime.

#### Node.js
Run the server using `src/node.ts`:
```typescript
import { createServer } from "node:http";
import { type ServerAdapterRequestHandler, createServerAdapter } from "@whatwg-node/server";
import { app } from "./app.ts";

const server = createServer(
  createServerAdapter(app.fetch as unknown as ServerAdapterRequestHandler<unknown>),
);
server.listen(8000);
```

Run the application:
```bash
npx ts-node src/node.ts
```

#### Deno
Run the server using `src/deno.ts`:
```typescript
import { app } from "./app.ts";

Deno.serve(app.fetch);
```

Run the application:
```bash
deno run --allow-net src/deno.ts
```

#### Bun
Run the server using `src/bun.ts`:
```typescript
import { app } from "./app.ts";

Bun.serve({ fetch: app.fetch });
```

Run the application:
```bash
bun src/bun.ts
```

Access the API at `http://localhost:8000`.

## Example Controllers

- **`GetEventController`**: Handles fetching a single event by ID.
- **`GetEventsController`**: Handles fetching a list of events with optional pagination.
- **`PostEventController`**: Handles creating a new event.

## Framework Components

### `Application`

The `Application` class manages controllers and routes incoming requests to the appropriate handler.

### `Controller`

Define routes, HTTP methods, and validation schemas using the `Controller` type.

### `HTTPStatus` and `HTTPMethod`

Constants for HTTP status codes and methods.

## Error Handling

The framework provides built-in error handling for:

- **Validation errors**: Returns `400 Bad Request` with details.
- **Syntax errors**: Returns `400 Bad Request` with a message.
- **Unknown errors**: Returns `500 Internal Server Error`.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.
