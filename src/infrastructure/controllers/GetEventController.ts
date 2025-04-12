import { z } from "zod";
import type { Controller } from "../../../framework/Controller.ts";
import { HTTPCode } from "../../../framework/HTTPCode.ts";
import { HTTPMethod } from "../../../framework/HTTPMethod.ts";

const Params = z.object({});

const RequestBody = z.undefined();

const ResponseBody = z.object({
  id: z.string().uuid(),
  name: z.string(),
});

const path = "/api/events/:id" as const;

export const GetEventController: Controller<
  typeof path,
  typeof Params,
  typeof RequestBody,
  typeof ResponseBody
> = {
  path,
  method: HTTPMethod.GET,
  params: Params,
  requestBody: RequestBody,
  responseBody: ResponseBody,
  handler: async (data) => {
    console.log("[Controller] GetEvent:", data.path.id);

    return {
      status: HTTPCode.OK,
      json: {
        id: "fd61734e-1ee9-41ac-8b0b-c7f8794a5981",
        name: "First Event",
      },
    };
  },
};
