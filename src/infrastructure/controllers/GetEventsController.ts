import { z } from "zod";
import type { Controller } from "../../../framework/Controller.ts";
import { HTTPMethod } from "../../../framework/HTTPMethod.ts";
import { HTTPStatus } from "../../../framework/HTTPStatus.ts";

const Params = z.object({
  offset: z
    .string()
    .transform((val) => Number.parseInt(val, 10))
    .pipe(z.number())
    .optional(),
  limit: z
    .string()
    .transform((val) => Number.parseInt(val, 10))
    .pipe(z.number())
    .optional(),
});

const RequestBody = z.undefined();

const ResponseBody = z.array(
  z.object({
    id: z.string().uuid(),
    name: z.string(),
  }),
);

const path = "/api/events" as const;

export const GetEventsController: Controller<
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
    console.log("[Controller] GetEvents:", data.params.offset, data.params.limit);

    return {
      status: HTTPStatus.OK,
      json: [
        {
          id: "fd61734e-1ee9-41ac-8b0b-c7f8794a5981",
          name: "First Event",
        },
        {
          id: "258cbaa0-76cf-4c02-b76f-07a39a76e862",
          name: "Second Event",
        },
      ],
    };
  },
};
