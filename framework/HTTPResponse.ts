import type { HTTPCode } from "./HTTPCode.ts";

export type HTTPResponse<T> = {
  status: HTTPCode;
  json: T;
};
