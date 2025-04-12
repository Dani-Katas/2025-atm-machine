import { ZodError } from "zod";
import type { AnyController, AnyControllerWithPattern } from "./Controller.ts";
import { HTTPMethod } from "./HTTPMethod.ts";
import { HTTPStatus } from "./HTTPStatus.ts";

export class Application {
  private readonly controllers: AnyControllerWithPattern[];

  constructor(controllers: AnyController[]) {
    this.controllers = controllers.map((c) => ({
      ...c,
      pattern: new URLPattern({ pathname: c.path }),
    }));
  }

  async unsafeHandle(request: Request): Promise<Response> {
    console.log(request.method, new URL(request.url).pathname);

    const controller = this.controllers
      .filter((c) => c.method === request.method)
      .filter((c) => c.pattern.test(request.url))
      .at(0);

    const match = controller?.pattern?.exec(request.url);

    if (controller && match) {
      const groups = match.pathname.groups;
      const params = Object.fromEntries(new URLSearchParams(match.search.input));
      const isQuery = request.method === HTTPMethod.GET || request.method === HTTPMethod.HEAD;

      const response = await controller.handler({
        path: groups as Record<string, never>,
        params: controller.params.parse(params),
        body: isQuery ? undefined : controller.requestBody.parse(await request.json()),
      });

      return this.createResponse(response.status, response.json);
    }

    return this.createResponse(HTTPStatus.NOT_FOUND, {});
  }

  fetch = (...params: Parameters<typeof fetch>): Promise<Response> => {
    const [request] = params;

    if (isRequest(request)) {
      return this.unsafeHandle(request)
        .catch(this.handleZodError)
        .catch(this.handleSyntaxError)
        .catch(this.handleUnknownError);
    }

    throw new Error("Only Request is supported as first parameter (for now)");
  };

  private handleZodError = (error: unknown) => {
    if (error instanceof ZodError) {
      return this.createResponse(HTTPStatus.BAD_REQUEST, { error });
    }
    throw error;
  };

  private handleSyntaxError = (error: unknown) => {
    if (error instanceof SyntaxError) {
      return this.createResponse(HTTPStatus.BAD_REQUEST, {
        message: error.message,
      });
    }
    throw error;
  };

  private handleUnknownError = (error: unknown) => {
    console.error(error);
    return this.createResponse(HTTPStatus.INTERNAL_SERVER_ERROR, {});
  };

  private createResponse(status: HTTPStatus, json: unknown) {
    return new Response(JSON.stringify(json), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }
}

function isRequest(input: unknown): input is Request {
  return input != null && typeof input === "object" && "url" in input;
}
