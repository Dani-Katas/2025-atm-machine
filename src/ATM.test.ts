import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { ATM, type CountableMoney } from "./ATM.ts";

describe("ATM", () => {
  it("cannot have money", () => {
    assert.throws(() => new ATM([]));
  });

  it("does nothing with zero amount", () => {
    const atm = new ATM([{ denominator: 1, type: "coin" }]);

    const money = atm.withdraw(0);

    assert.deepEqual(money, []);
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
    const atm = new ATM([{ denominator: 2, type: "coin" }]);

    const money = atm.withdraw(2);

    assert.deepEqual(money, [{ denominator: 2, type: "coin", quantity: 1 }] as CountableMoney[]);
  });

  it("dunno2", () => {
    const atm = new ATM([{ denominator: 2, type: "coin" }]);

    const money = atm.withdraw(4);

    assert.deepEqual(money, [{ denominator: 2, type: "coin", quantity: 2 }] as CountableMoney[]);
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

  it.skip("throws error if no available money", () => {
    const atm = new ATM([{ denominator: 2, type: "coin" }]);

    assert.throws(() => atm.withdraw(1));
  });
});
