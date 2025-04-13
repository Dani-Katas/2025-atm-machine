# Homemade Framework for HTTP Applications

This is a lightweight, homemade framework for building HTTP applications in TypeScript. It provides a simple structure for defining controllers, handling requests, and managing responses.

## Features

- **Controller-based architecture**: Define controllers with strict type validation using `zod`.
- **Request and response handling**: Built-in support for parsing parameters, request bodies, and generating structured responses.
- **Error handling**: Graceful handling of validation errors, syntax errors, and unknown errors.
- **Cross-platform support**: Works with Node.js, Deno, and Bun.
- **Dependency Injection Support**: Use your favorite dependency injection library (e.g., Inversify) to inject dependencies into controllers.

## Project Structure

- **`framework/`**: Core framework components, including `Application`, `Controller`, and HTTP utilities.
- **`src/infrastructure/controllers/`**: Example controllers for handling HTTP routes.
- **`src/app.ts`**: Application instance with registered controllers.
- **`src/`**: Entry points for different runtimes (`node.ts`, `deno.ts`, `bun.ts`).

## Getting Started

### Prerequisites

- Node.js (v24 or later) / Deno / Bun
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

    Example: `GetSpeakerController.ts`
    ```typescript
    import { z } from "zod";
    import { HTTPMethod } from "../../../framework/HTTPMethod.ts";
    import { createController } from "../../../framework/Controller.ts";
    import { HTTPStatus } from "../../../framework/HTTPStatus.ts";

    export const GetSpeakerController = createController(() => ({
      path: "/api/speakers/:id",
      method: HTTPMethod.GET,
      params: z.object({}),
      requestBody: z.undefined(),
      responseBody: z.object({
        id: z.string().uuid(),
        name: z.string(),
      }),
      handler: async (data) => {
        return {
          status: HTTPStatus.OK,
          json: { id: "example-id", name: "Example Speaker" },
        };
      },
    }));
    ```

2. **Register Controllers**: Add controllers to the `Application` instance in `src/app.ts`.

    ```typescript
    import { Application } from "../framework/Application.ts";
    import { GetSpeakerController } from "./infrastructure/controllers/GetSpeakerController.ts";
    import { GetSpeakersController } from "./infrastructure/controllers/GetSpeakersController.ts";
    import { PostSpeakerController } from "./infrastructure/controllers/PostSpeakerController.ts";

    export const app = new Application([
      GetSpeakerController.create(),
      GetSpeakersController.create(),
      PostSpeakerController.create(),
    ]);
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
node src/node.ts
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

- **`GetSpeakerController`**: Handles fetching a single speaker by ID.
- **`GetSpeakersController`**: Handles fetching a list of speakers with optional pagination.
- **`PostSpeakerController`**: Handles creating a new speaker.

## Framework Components

### `Application`

The `Application` class manages controllers and routes incoming requests to the appropriate handler. It includes built-in error handling for validation errors, syntax errors, and unknown errors.

### `createController`

The `createController` function simplifies the creation of controllers by allowing you to define the route, HTTP method, validation schemas, and handler logic in a structured way. It also supports dependency injection for enhanced flexibility.

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
