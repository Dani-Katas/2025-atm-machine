import { z } from "zod";
import type { Controller } from "../../../framework/Controller.ts";
import { HTTPMethod } from "../../../framework/HTTPMethod.ts";
import { HTTPStatus } from "../../../framework/HTTPStatus.ts";

const Params = z.object({});

const RequestBody = z.object({
  id: z.string().uuid(),
  name: z.string(),
});

const ResponseBody = z.undefined();

const path = "/api/events" as const;

export const PostEventController: Controller<
  typeof path,
  typeof Params,
  typeof RequestBody,
  typeof ResponseBody
> = {
  path,
  method: HTTPMethod.POST,
  params: Params,
  requestBody: RequestBody,
  responseBody: ResponseBody,
  handler: async (data) => {
    console.log("[Controller] PostEvent:", data.body.id, data.body.id);

    return {
      status: HTTPStatus.CREATED,
      json: undefined,
    };
  },
};
