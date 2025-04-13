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

  it("creates an speaker", async () => {
    const response = await client.post("api/speakers", {
      json: {
        id: "fd61734e-1ee9-41ac-8b0b-c7f8794a5981",
        name: "John Doe",
      },
    });

    expect(response).hasStatus(HTTPStatus.CREATED);
  });

  it("returns error when creating a wrong speaker", async () => {
    const promise = client.post("api/speakers", {
      json: {
        id: "wrong-id",
        name: "John Doe",
      },
    });

    await expect(promise).rejects.hasStatus(HTTPStatus.BAD_REQUEST);
  });

  it("gets a speaker by id", async () => {
    const response = await client.get("api/speakers/fd61734e-1ee9-41ac-8b0b-c7f8794a5981");

    expect(response).hasStatus(HTTPStatus.OK);
    await expect(response).hasBody({
      id: "fd61734e-1ee9-41ac-8b0b-c7f8794a5981",
      name: "John Doe",
    });
  });

  it("lists the speakers", async () => {
    const response = await client.get("api/speakers");

    expect(response).hasStatus(HTTPStatus.OK);
    await expect(response).hasBody([
      {
        id: "fd61734e-1ee9-41ac-8b0b-c7f8794a5981",
        name: "John Doe",
      },
      {
        id: "258cbaa0-76cf-4c02-b76f-07a39a76e862",
        name: "Alex Smith",
      },
    ]);
  });
});
