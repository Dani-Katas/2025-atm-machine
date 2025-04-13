import { z } from "zod";
import { NoBody, NoParams } from "../../../framework/Aliases.ts";
import { createController } from "../../../framework/Controller.ts";
import { HTTPMethod } from "../../../framework/HTTPMethod.ts";
import { HTTPStatus } from "../../../framework/HTTPStatus.ts";
import type { CreateSpeaker } from "../../application/CreateSpeaker.ts";

export const PostSpeakerController = createController((createSpeaker: CreateSpeaker) => ({
  path: "/api/speakers" as const,
  method: HTTPMethod.POST,
  params: NoParams,
  requestBody: z.object({
    id: z.string().uuid(),
    name: z.string(),
  }),
  responseBody: NoBody,
  handler: async (data) => {
    console.log("[Controller] PostEvent:", data.body.id, data.body.id);

    await createSpeaker.execute(); // Dummy call to an use case

    return {
      status: HTTPStatus.CREATED,
      json: undefined,
    };
  },
}));
