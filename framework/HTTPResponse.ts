import type { HTTPStatus } from "./HTTPStatus.ts";

export type HTTPResponse<T> = {
  status: HTTPStatus;
  json: T;
};
