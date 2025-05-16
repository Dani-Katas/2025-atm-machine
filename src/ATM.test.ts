import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { ATM } from "./ATM.ts";

describe("ATM", () => {
  it("cannot have money", () => {
    assert.throws(() => new ATM([]));
  });

  it("does nothing with zero amount", () => {
    const atm = new ATM([{ denominator: 1, type: "coin" }]);

    const money = atm.withdraw(0);

    assert.deepEqual(money, []);
  });
});
