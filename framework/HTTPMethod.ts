export const HTTPMethod = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
  OPTIONS: "OPTIONS",
  HEAD: "HEAD",
  CONNECT: "CONNECT",
  TRACE: "TRACE",
};

export type HTTPMethod = (typeof HTTPMethod)[keyof typeof HTTPMethod];
