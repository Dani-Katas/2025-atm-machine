/**
 * HTTP request methods as defined by the HTTP/1.1 standard.
 * @see {@link https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods}
 */
export const HTTPMethod = {
  /**
   * The GET method requests a representation of the specified resource. 
   * Requests using GET should only retrieve data.
   */
  GET: "GET",

  /**
   * The POST method submits data to be processed to a specified resource.
   * This may result in the creation of a new resource or updates to existing resources.
   */
  POST: "POST",

  /**
   * The PUT method replaces all current representations of the target resource with the uploaded content.
   */
  PUT: "PUT",

  /**
   * The DELETE method deletes the specified resource.
   */
  DELETE: "DELETE",

  /**
   * The PATCH method applies partial modifications to a resource.
   */
  PATCH: "PATCH",

  /**
   * The OPTIONS method describes the communication options for the target resource.
   */
  OPTIONS: "OPTIONS",

  /**
   * The HEAD method asks for a response identical to a GET request, but without the response body.
   */
  HEAD: "HEAD",

  /**
   * The CONNECT method establishes a tunnel to the server identified by the target resource.
   */
  CONNECT: "CONNECT",

  /**
   * The TRACE method performs a message loop-back test along the path to the target resource.
   */
  TRACE: "TRACE",
};

export type HTTPMethod = (typeof HTTPMethod)[keyof typeof HTTPMethod];
