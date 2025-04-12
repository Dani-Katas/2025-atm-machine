# Homemade Framework for HTTP Applications

This is a lightweight, homemade framework for building HTTP applications in TypeScript. It provides a simple structure for defining controllers, handling requests, and managing responses.

## Features

- **Controller-based architecture**: Define controllers with strict type validation using `zod`.
- **Request and response handling**: Built-in support for parsing parameters, request bodies, and generating structured responses.
- **Error handling**: Graceful handling of validation errors, syntax errors, and unknown errors.
- **Node.js adapter**: Easily integrate with Node.js HTTP servers.

## Project Structure

- **`framework/`**: Core framework components, including `Application`, `Controller`, and HTTP utilities.
- **`src/infrastructure/controllers/`**: Example controllers for handling HTTP routes.
- **`index.ts`**: Entry point for the application.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- TypeScript

### Installation

Clone the repository:

```bash
git clone git@github.com:DanielRamosAcosta/framework.git
cd framework
```

Install dependencies:

```bash
npm install
```

### Usage

1. **Define Controllers**: Create controllers in the `src/infrastructure/controllers/` directory. Each controller specifies a route, HTTP method, and handler logic.

Example: `GetEventController.ts`
```typescript
import { z } from "zod";
import { HTTPCode, HTTPMethod } from "../../../framework/HTTPCode.ts";
import type { Controller } from "../../../framework/Controller.ts";

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
      status: HTTPCode.OK,
      json: { id: "example-id", name: "Example Event" },
    };
  },
};
```

2. **Register Controllers**: Add controllers to the `Application` instance in `index.ts`.

```typescript
import { Application } from "./framework/Application.ts";
import { GetEventController } from "./src/infrastructure/controllers/GetEventController.ts";

const app = new Application([GetEventController]);
```

3. **Start the Server**: Use the Node.js adapter to serve the application.

```typescript
import http from "node:http";
import { serve } from "./framework/adapters/node.ts";

const server = http.createServer();
server.listen(3000);

await serve({ app, server });
```

Run the application:

```bash
npx ts-node index.ts
```

Access the API at `http://localhost:3000`.

## Example Controllers

- **`GetEventController`**: Handles fetching a single event by ID.
- **`GetEventsController`**: Handles fetching a list of events with optional pagination.
- **`PostEventController`**: Handles creating a new event.

## Framework Components

### `Application`

The `Application` class manages controllers and routes incoming requests to the appropriate handler.

### `Controller`

Define routes, HTTP methods, and validation schemas using the `Controller` type.

### `HTTPCode` and `HTTPMethod`

Constants for HTTP status codes and methods.

### `adapters/node.ts`

Adapter for integrating the framework with Node.js HTTP servers.

## Error Handling

The framework provides built-in error handling for:

- **Validation errors**: Returns `400 Bad Request` with details.
- **Syntax errors**: Returns `400 Bad Request` with a message.
- **Unknown errors**: Returns `500 Internal Server Error`.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.
