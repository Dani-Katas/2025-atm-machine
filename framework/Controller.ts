import type { URLPattern } from "node:url";
import type { TypeOf, ZodType } from "zod";
import type { ExtractParams } from "./ExtractParams.ts";
import type { HTTPMethod } from "./HTTPMethod.ts";
import type { HTTPResponse } from "./HTTPResponse.ts";

export type Controller<
  Path extends string | unknown,
  ParamsType extends ZodType,
  RequestBody extends ZodType,
  ResponseBody extends ZodType,
> = {
  path: Path;
  method: HTTPMethod;
  params: ParamsType;
  requestBody: RequestBody;
  responseBody: ResponseBody;
  handler: (data: {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    path: Path extends string ? ExtractParams<Path> : any;
    params: TypeOf<ParamsType>;
    body: TypeOf<RequestBody>;
  }) => Promise<HTTPResponse<TypeOf<ResponseBody>>>;
};

export type AnyController = Controller<unknown, ZodType, ZodType, ZodType>;

export type AnyControllerWithPattern = AnyController & { pattern: URLPattern };
