import { z } from "zod";
import { NoBody, NoParams } from "../../../framework/Aliases.ts";
import { createController } from "../../../framework/Controller.ts";
import { HTTPMethod } from "../../../framework/HTTPMethod.ts";
import { HTTPStatus } from "../../../framework/HTTPStatus.ts";

export const GetSpeakerController = createController(() => ({
  path: "/api/speakers/:id" as const,
  method: HTTPMethod.GET,
  params: NoParams,
  requestBody: NoBody,
  responseBody: z.object({
    id: z.string().uuid(),
    name: z.string(),
  }),
  handler: async (data) => {
    console.log("[Controller] GetEvent:", data.path.id);

    return {
      status: HTTPStatus.OK,
      json: {
        id: "fd61734e-1ee9-41ac-8b0b-c7f8794a5981",
        name: "John Doe",
      },
    };
  },
}));
