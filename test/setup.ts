import { expect } from "expect";
import { HTTPError } from "ky";
// @ts-ignore
import { URLPattern } from "node:url";

// Patch until URLPattern is available in globalThis in node 24
// @ts-ignore
globalThis.URLPattern = URLPattern;


expect.extend({
  hasStatus(received, expected) {
    if (received instanceof HTTPError) {
      const actualStatus = received.response.status;
      return {
        pass: actualStatus === expected,
        message: () => `Response has status ${actualStatus} instead of ${expected}`,
      };
    }
    if (received instanceof Response) {
      const actualStatus = received.status;
      return {
        pass: actualStatus === expected,
        message: () => `Response has status ${actualStatus} instead of ${expected}`,
      };
    }

    return {
      pass: false,
      message: () => `Unknown type ${received}`,
    };
  },

  async hasBody(received, expected) {
    if (received instanceof HTTPError) {
      const body = await received.response.json();
      const pass = this.equals(body, expected);

      return {
        pass,
        message: () =>
          pass
            ? `Expected body not to equal ${this.utils.printExpected(expected)}`
            : `Expected body to equal ${this.utils.printExpected(
                expected,
              )}\nReceived: ${this.utils.printReceived(body)}`,
      };
    }
    if (received instanceof Response) {
      const body = await received.json();
      const pass = this.equals(body, expected);

      return {
        pass,
        message: () =>
          pass
            ? `Expected body not to equal ${this.utils.printExpected(expected)}`
            : `Expected body to equal ${this.utils.printExpected(
                expected,
              )}\nReceived: ${this.utils.printReceived(body)}`,
      };
    }
    if (received instanceof Promise) {
      const response = await received;
      const body = await response.json();
      const pass = this.equals(body, expected);

      return {
        pass,
        message: () =>
          pass
            ? `Expected body not to equal ${this.utils.printExpected(expected)}`
            : `Expected body to equal ${this.utils.printExpected(
                expected,
              )}\nReceived: ${this.utils.printReceived(body)}`,
      };
    }

    return {
      pass: false,
      message: () => `Unknown type ${received}`,
    };
  },
});
