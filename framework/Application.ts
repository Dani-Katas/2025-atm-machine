import { URLPattern } from "node:url";
import { ZodError } from "zod";
import type { AnyController, AnyControllerWithPattern } from "./Controller.ts";
import { HTTPCode } from "./HTTPCode.ts";
import { HTTPMethod } from "./HTTPMethod.ts";

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

    if (controller) {
      const match = controller.pattern.exec(request.url);
      const groups = match.pathname.groups;
      const params = Object.fromEntries(
        new URLSearchParams(match.search.input),
      );
      const isQuery =
        request.method === HTTPMethod.GET || request.method === HTTPMethod.HEAD;

      const response = await controller.handler({
        path: groups,
        params: controller.params.parse(params),
        body: isQuery
          ? undefined
          : controller.requestBody.parse(await request.json()),
      });

      return this.createResponse(response.status, response.json);
    }

    return this.createResponse(HTTPCode.NOT_FOUND, {});
  }

  handle = (request: Request): Promise<Response> =>
    this.unsafeHandle(request)
      .catch(this.handleZodError)
      .catch(this.handleSyntaxError)
      .catch(this.handleUnknownError);

  private handleZodError = (error: unknown) => {
    if (error instanceof ZodError) {
      return this.createResponse(HTTPCode.BAD_REQUEST, { error });
    }
    throw error;
  };

  private handleSyntaxError = (error: unknown) => {
    if (error instanceof SyntaxError) {
      return this.createResponse(HTTPCode.BAD_REQUEST, {
        message: error.message,
      });
    }
    throw error;
  };

  private handleUnknownError = (error: unknown) => {
    console.error(error);
    return this.createResponse(HTTPCode.INTERNAL_SERVER_ERROR, {});
  };

  private createResponse(status: HTTPCode, json: unknown) {
    return new Response(JSON.stringify(json), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }
}
