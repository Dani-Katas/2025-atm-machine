import { describe, it } from "node:test";
import { expect } from "expect";
import ky from "ky";
import { HTTPStatus } from "../framework/HTTPStatus.ts";
import { app } from "../src/app.ts";

describe("API", () => {
  const client = ky.extend({
    prefixUrl: "http://localhost",
    fetch: app.fetch,
  });

  it("creates an event", async () => {
    const response = await client.post("api/events", {
      json: {
        id: "fd61734e-1ee9-41ac-8b0b-c7f8794a5981",
        name: "First Event",
      },
    });

    expect(response).hasStatus(HTTPStatus.CREATED);
  });

  it("returns error when posting wrong events", async () => {
    const promise = client.post("api/events", {
      json: {
        id: "wrong-id",
        name: "First Event",
      },
    });

    await expect(promise).rejects.hasStatus(HTTPStatus.BAD_REQUEST);
  });

  it("returns an event", async () => {
    const response = await client.get("api/events/fd61734e-1ee9-41ac-8b0b-c7f8794a5981");

    expect(response).hasStatus(HTTPStatus.OK);
    await expect(response).hasBody({
      id: "fd61734e-1ee9-41ac-8b0b-c7f8794a5981",
      name: "First Event",
    });
  });

  it("returns the response for listing events", async () => {
    const response = await client.get("api/events");

    expect(response).hasStatus(HTTPStatus.OK);
    await expect(response).hasBody([
      {
        id: "fd61734e-1ee9-41ac-8b0b-c7f8794a5981",
        name: "First Event",
      },
      {
        id: "258cbaa0-76cf-4c02-b76f-07a39a76e862",
        name: "Second Event",
      },
    ]);
  });
});
