import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { ATM } from "./ATM.ts";
import type { CountableMoney } from "./CountableMoney.js";

describe("ATM", () => {
  it("anotherx", () => {
    const atm = new ATM([{ denominator: 1, type: "coin" }]);

    const money = atm.withdraw(3);

    assert.deepEqual(money, [{ denominator: 1, type: "coin", quantity: 3 }] as CountableMoney[]);
  });

  it("anotherxx", () => {
    const atm = new ATM([{ denominator: 1, type: "coin" }]);

    const money = atm.withdraw(4);

    assert.deepEqual(money, [{ denominator: 1, type: "coin", quantity: 4 }] as CountableMoney[]);
  });

  it("does nothing with zero amount", () => {
    const atm = new ATM([{ denominator: 1, type: "coin" }]);

    assert.deepEqual(atm.withdraw(0), []);
  });

  it("fobbarbaz", () => {
    const atm = new ATM([{ denominator: 4, type: "coin" }]);

    const money = atm.withdraw(4);

    assert.deepEqual(money, [{ denominator: 4, type: "coin", quantity: 1 }] as CountableMoney[]);
  });

  it("returns one coin", () => {
    const atm = new ATM([{ denominator: 1, type: "coin" }]);

    const money = atm.withdraw(1);

    assert.deepEqual(money, [{ denominator: 1, type: "coin", quantity: 1 }] as CountableMoney[]);
  });

  it("returns two coins", () => {
    const atm = new ATM([{ denominator: 1, type: "coin" }]);

    const money = atm.withdraw(2);

    assert.deepEqual(money, [{ denominator: 1, type: "coin", quantity: 2 }] as CountableMoney[]);
  });

  it("uses another type of denominator", () => {
    const atm = new ATM([{ denominator: 1, type: "coin" }]);

    const money = atm.withdraw(99999);

    assert.deepEqual(money, [
      { denominator: 1, type: "coin", quantity: 99999 },
    ] as CountableMoney[]);
  });

  it("uses another type of denominator", () => {
    const atm = new ATM([{ denominator: 2, type: "coin" }]);

    const money = atm.withdraw(2);

    assert.deepEqual(money, [{ denominator: 2, type: "coin", quantity: 1 }] as CountableMoney[]);
  });

  it("xxxxxxx", () => {
    const atm = new ATM([{ denominator: 2, type: "coin" }]);

    assert.throws(() => atm.withdraw(5));
  });

  it("yyyyyy", () => {
    const atm = new ATM([{ denominator: 2, type: "coin" }]);

    assert.deepEqual(atm.withdraw(0), []);
  });

  it("dummy test", () => {
    const atm = new ATM([]);

    assert.throws(() => atm.withdraw(1));
  });

  it("yyyyyyyyy", () => {
    const atm = new ATM([{ denominator: 3, type: "coin" }]);

    assert.throws(() => atm.withdraw(1));
  });

  it("yyyyyyyyyyyy", () => {
    const atm = new ATM([{ denominator: 3, type: "coin" }]);

    assert.throws(() => atm.withdraw(2));
  });

  it("yyyyyyyyyyyyyyy", () => {
    const atm = new ATM([{ denominator: 3, type: "coin" }]);

    const money = atm.withdraw(3);

    assert.deepEqual(money, [{ denominator: 3, type: "coin", quantity: 1 }] as CountableMoney[]);
  });

  it("yyyyyyyyyyyyyyasdasdy", () => {
    const atm = new ATM([{ denominator: 3, type: "coin" }]);

    const money = atm.withdraw(9);

    assert.deepEqual(money, [{ denominator: 3, type: "coin", quantity: 3 }] as CountableMoney[]);
  });

  it("yyyyyyyyyyyyyyyyyyy", () => {
    const atm = new ATM([{ denominator: 3, type: "coin" }]);

    assert.throws(() => atm.withdraw(4));
  });

  it("yyyyyyyyyyyyyyyyyyyyyyy", () => {
    const atm = new ATM([{ denominator: 3, type: "coin" }]);

    assert.throws(() => atm.withdraw(5));
  });

  it("xxxxxxxx", () => {
    const atm = new ATM([{ denominator: 2, type: "coin" }]);

    const money = atm.withdraw(6);

    assert.deepEqual(money, [{ denominator: 2, type: "coin", quantity: 3 }] as CountableMoney[]);
  });

  it("dunno2", () => {
    const atm = new ATM([{ denominator: 2, type: "coin" }]);

    const money = atm.withdraw(4);

    assert.deepEqual(money, [{ denominator: 2, type: "coin", quantity: 2 }] as CountableMoney[]);
  });

  it("dunno3", () => {
    const atm = new ATM([{ denominator: 2, type: "coin" }]);

    assert.throws(() => atm.withdraw(3));
  });

  it("uses another type of denominator with leftovers", () => {
    const atm = new ATM([
      { denominator: 2, type: "coin" },
      { denominator: 1, type: "coin" },
    ]);

    const money = atm.withdraw(3);

    assert.deepEqual(money, [
      { denominator: 2, type: "coin", quantity: 1 },
      { denominator: 1, type: "coin", quantity: 1 },
    ] as CountableMoney[]);
  });

  it("dunno", () => {
    const atm = new ATM([
      { denominator: 2, type: "coin" },
      { denominator: 1, type: "coin" },
    ]);

    const money = atm.withdraw(4);

    assert.deepEqual(money, [{ denominator: 2, type: "coin", quantity: 2 }] as CountableMoney[]);
  });

  it("another", () => {
    const atm = new ATM([
      { denominator: 2, type: "coin" },
      { denominator: 1, type: "coin" },
    ]);

    const money = atm.withdraw(2);

    assert.deepEqual(money, [{ denominator: 2, type: "coin", quantity: 1 }] as CountableMoney[]);
  });

  it("another2", () => {
    const atm = new ATM([
      { denominator: 2, type: "coin" },
      { denominator: 1, type: "coin" },
    ]);

    const money = atm.withdraw(1);

    assert.deepEqual(money, [{ denominator: 1, type: "coin", quantity: 1 }] as CountableMoney[]);
  });

  it("another3", () => {
    const atm = new ATM([
      { denominator: 2, type: "coin" },
      { denominator: 1, type: "coin" },
    ]);

    const money = atm.withdraw(5);

    assert.deepEqual(money, [
      { denominator: 2, type: "coin", quantity: 2 },
      { denominator: 1, type: "coin", quantity: 1 },
    ] as CountableMoney[]);
  });

  it("another4", () => {
    const atm = new ATM([
      { denominator: 2, type: "coin" },
      { denominator: 1, type: "coin" },
    ]);

    const money = atm.withdraw(6);

    assert.deepEqual(money, [{ denominator: 2, type: "coin", quantity: 3 }] as CountableMoney[]);
  });

  it("another7", () => {
    const atm = new ATM([
      { denominator: 3, type: "coin" },
      { denominator: 1, type: "coin" },
    ]);

    const money = atm.withdraw(7);

    assert.deepEqual(money, [
      { denominator: 3, type: "coin", quantity: 2 },
      { denominator: 1, type: "coin", quantity: 1 },
    ] as CountableMoney[]);
  });

  it("another7", () => {
    const atm = new ATM([
      { denominator: 2, type: "coin" },
      { denominator: 1, type: "coin" },
    ]);

    const money = atm.withdraw(7);

    assert.deepEqual(money, [
      { denominator: 2, type: "coin", quantity: 3 },
      { denominator: 1, type: "coin", quantity: 1 },
    ] as CountableMoney[]);
  });

  it("another7foo", () => {
    const atm = new ATM([
      { denominator: 4, type: "coin" },
      { denominator: 1, type: "coin" },
    ]);

    const money = atm.withdraw(7);

    assert.deepEqual(money, [
      { denominator: 4, type: "coin", quantity: 1 },
      { denominator: 1, type: "coin", quantity: 3 },
    ] as CountableMoney[]);
  });

  it("asdasdasd", () => {
    const atm = new ATM([
      { denominator: 5, type: "coin" },
      { denominator: 2, type: "coin" },
      { denominator: 1, type: "coin" },
    ]);

    const money = atm.withdraw(1);

    assert.deepEqual(money, [{ denominator: 1, type: "coin", quantity: 1 }] as CountableMoney[]);
  });

  it("asdasdasd", () => {
    const atm = new ATM([
      { denominator: 5, type: "coin" },
      { denominator: 2, type: "coin" },
      { denominator: 1, type: "coin" },
    ]);

    const money = atm.withdraw(2);

    assert.deepEqual(money, [{ denominator: 2, type: "coin", quantity: 1 }] as CountableMoney[]);
  });

  it("asdasdas", () => {
    const atm = new ATM([
      { denominator: 5, type: "coin" },
      { denominator: 2, type: "coin" },
      { denominator: 1, type: "coin" },
    ]);

    const money = atm.withdraw(3);

    assert.deepEqual(money, [
      { denominator: 2, type: "coin", quantity: 1 },
      { denominator: 1, type: "coin", quantity: 1 },
    ] as CountableMoney[]);
  });

  it("dfñkaifjasds", () => {
    const atm = new ATM([
      { denominator: 5, type: "coin" },
      { denominator: 2, type: "coin" },
      { denominator: 1, type: "coin" },
    ]);

    const money = atm.withdraw(4);

    assert.deepEqual(money, [{ denominator: 2, type: "coin", quantity: 2 }] as CountableMoney[]);
  });

  it("asdjoasijdoisjdosj", () => {
    const atm = new ATM([
      { denominator: 5, type: "coin" },
      { denominator: 2, type: "coin" },
      { denominator: 1, type: "coin" },
    ]);

    const money = atm.withdraw(5);

    assert.deepEqual(money, [{ denominator: 5, type: "coin", quantity: 1 }] as CountableMoney[]);
  });

  it("wasakaka", () => {
    const atm = new ATM([
      { denominator: 10, type: "coin" },
      { denominator: 5, type: "coin" },
      { denominator: 2, type: "coin" },
      { denominator: 1, type: "coin" },
    ]);

    const money = atm.withdraw(18);

    assert.deepEqual(money, [
      { denominator: 10, type: "coin", quantity: 1 },
      { denominator: 5, type: "coin", quantity: 1 },
      { denominator: 2, type: "coin", quantity: 1 },
      { denominator: 1, type: "coin", quantity: 1 },
    ] as CountableMoney[]);
  });

  it.skip("throws error if no available money", () => {
    const atm = new ATM([{ denominator: 2, type: "coin" }]);

    assert.throws(() => atm.withdraw(1));
  });
});
