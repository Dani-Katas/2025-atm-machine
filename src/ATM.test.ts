import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { ATM } from "./ATM.ts";
import type { Denomination } from "./Denomination.js";

describe("ATM", () => {
  it("anotherx", () => {
    const atm = ATM.of([{ value: 1, type: "coin" }]);

    const money = atm.withdraw(3);

    assert.deepEqual(money, [{ value: 1, type: "coin", quantity: 3 }] as Denomination[]);
  });

  it("anotherxx", () => {
    const atm = ATM.of([{ value: 1, type: "coin" }]);

    const money = atm.withdraw(4);

    assert.deepEqual(money, [{ value: 1, type: "coin", quantity: 4 }] as Denomination[]);
  });

  it("does nothing with zero amount", () => {
    const atm = ATM.of([{ value: 1, type: "coin" }]);

    assert.deepEqual(atm.withdraw(0), []);
  });

  it("fobbarbaz", () => {
    const atm = ATM.of([{ value: 4, type: "coin" }]);

    const money = atm.withdraw(4);

    assert.deepEqual(money, [{ value: 4, type: "coin", quantity: 1 }] as Denomination[]);
  });

  it("returns one coin", () => {
    const atm = ATM.of([{ value: 1, type: "coin" }]);

    const money = atm.withdraw(1);

    assert.deepEqual(money, [{ value: 1, type: "coin", quantity: 1 }] as Denomination[]);
  });

  it("returns two coins", () => {
    const atm = ATM.of([{ value: 1, type: "coin" }]);

    const money = atm.withdraw(2);

    assert.deepEqual(money, [{ value: 1, type: "coin", quantity: 2 }] as Denomination[]);
  });

  it("uses another type of value", () => {
    const atm = ATM.of([{ value: 1, type: "coin" }]);

    const money = atm.withdraw(99999);

    assert.deepEqual(money, [{ value: 1, type: "coin", quantity: 99999 }] as Denomination[]);
  });

  it("uses another type of value", () => {
    const atm = ATM.of([{ value: 2, type: "coin" }]);

    const money = atm.withdraw(2);

    assert.deepEqual(money, [{ value: 2, type: "coin", quantity: 1 }] as Denomination[]);
  });

  it("xxxxxxx", () => {
    const atm = ATM.of([{ value: 2, type: "coin" }]);

    assert.throws(() => atm.withdraw(5));
  });

  it("yyyyyy", () => {
    const atm = ATM.of([{ value: 2, type: "coin" }]);

    assert.deepEqual(atm.withdraw(0), []);
  });

  it("dummy test", () => {
    const atm = ATM.of([]);

    assert.throws(() => atm.withdraw(1));
  });

  it("yyyyyyyyy", () => {
    const atm = ATM.of([{ value: 3, type: "coin" }]);

    assert.throws(() => atm.withdraw(1));
  });

  it("yyyyyyyyyyyy", () => {
    const atm = ATM.of([{ value: 3, type: "coin" }]);

    assert.throws(() => atm.withdraw(2));
  });

  it("yyyyyyyyyyyyyyy", () => {
    const atm = ATM.of([{ value: 3, type: "coin" }]);

    const money = atm.withdraw(3);

    assert.deepEqual(money, [{ value: 3, type: "coin", quantity: 1 }] as Denomination[]);
  });

  it("yyyyyyyyyyyyyyasdasdy", () => {
    const atm = ATM.of([{ value: 3, type: "coin" }]);

    const money = atm.withdraw(9);

    assert.deepEqual(money, [{ value: 3, type: "coin", quantity: 3 }] as Denomination[]);
  });

  it("yyyyyyyyyyyyyyyyyyy", () => {
    const atm = ATM.of([{ value: 3, type: "coin" }]);

    assert.throws(() => atm.withdraw(4));
  });

  it("yyyyyyyyyyyyyyyyyyyyyyy", () => {
    const atm = ATM.of([{ value: 3, type: "coin" }]);

    assert.throws(() => atm.withdraw(5));
  });

  it("xxxxxxxx", () => {
    const atm = ATM.of([{ value: 2, type: "coin" }]);

    const money = atm.withdraw(6);

    assert.deepEqual(money, [{ value: 2, type: "coin", quantity: 3 }] as Denomination[]);
  });

  it("dunno2", () => {
    const atm = ATM.of([{ value: 2, type: "coin" }]);

    const money = atm.withdraw(4);

    assert.deepEqual(money, [{ value: 2, type: "coin", quantity: 2 }] as Denomination[]);
  });

  it("dunno3", () => {
    const atm = ATM.of([{ value: 2, type: "coin" }]);

    assert.throws(() => atm.withdraw(3));
  });

  it("uses another type of value with leftovers", () => {
    const atm = ATM.of([
      { value: 2, type: "coin" },
      { value: 1, type: "coin" },
    ]);

    const money = atm.withdraw(3);

    assert.deepEqual(money, [
      { value: 2, type: "coin", quantity: 1 },
      { value: 1, type: "coin", quantity: 1 },
    ] as Denomination[]);
  });

  it("dunno", () => {
    const atm = ATM.of([
      { value: 2, type: "coin" },
      { value: 1, type: "coin" },
    ]);

    const money = atm.withdraw(4);

    assert.deepEqual(money, [{ value: 2, type: "coin", quantity: 2 }] as Denomination[]);
  });

  it("another", () => {
    const atm = ATM.of([
      { value: 2, type: "coin" },
      { value: 1, type: "coin" },
    ]);

    const money = atm.withdraw(2);

    assert.deepEqual(money, [{ value: 2, type: "coin", quantity: 1 }] as Denomination[]);
  });

  it("another2", () => {
    const atm = ATM.of([
      { value: 2, type: "coin" },
      { value: 1, type: "coin" },
    ]);

    const money = atm.withdraw(1);

    assert.deepEqual(money, [{ value: 1, type: "coin", quantity: 1 }] as Denomination[]);
  });

  it("another3", () => {
    const atm = ATM.of([
      { value: 2, type: "coin" },
      { value: 1, type: "coin" },
    ]);

    const money = atm.withdraw(5);

    assert.deepEqual(money, [
      { value: 2, type: "coin", quantity: 2 },
      { value: 1, type: "coin", quantity: 1 },
    ] as Denomination[]);
  });

  it("another4", () => {
    const atm = ATM.of([
      { value: 2, type: "coin" },
      { value: 1, type: "coin" },
    ]);

    const money = atm.withdraw(6);

    assert.deepEqual(money, [{ value: 2, type: "coin", quantity: 3 }] as Denomination[]);
  });

  it("another7", () => {
    const atm = ATM.of([
      { value: 3, type: "coin" },
      { value: 1, type: "coin" },
    ]);

    const money = atm.withdraw(7);

    assert.deepEqual(money, [
      { value: 3, type: "coin", quantity: 2 },
      { value: 1, type: "coin", quantity: 1 },
    ] as Denomination[]);
  });

  it("another7", () => {
    const atm = ATM.of([
      { value: 2, type: "coin" },
      { value: 1, type: "coin" },
    ]);

    const money = atm.withdraw(7);

    assert.deepEqual(money, [
      { value: 2, type: "coin", quantity: 3 },
      { value: 1, type: "coin", quantity: 1 },
    ] as Denomination[]);
  });

  it("another7foo", () => {
    const atm = ATM.of([
      { value: 4, type: "coin" },
      { value: 1, type: "coin" },
    ]);

    const money = atm.withdraw(7);

    assert.deepEqual(money, [
      { value: 4, type: "coin", quantity: 1 },
      { value: 1, type: "coin", quantity: 3 },
    ] as Denomination[]);
  });

  it("asdasdasd", () => {
    const atm = ATM.of([
      { value: 5, type: "coin" },
      { value: 2, type: "coin" },
      { value: 1, type: "coin" },
    ]);

    const money = atm.withdraw(1);

    assert.deepEqual(money, [{ value: 1, type: "coin", quantity: 1 }] as Denomination[]);
  });

  it("asdasdasd", () => {
    const atm = ATM.of([
      { value: 5, type: "coin" },
      { value: 2, type: "coin" },
      { value: 1, type: "coin" },
    ]);

    const money = atm.withdraw(2);

    assert.deepEqual(money, [{ value: 2, type: "coin", quantity: 1 }] as Denomination[]);
  });

  it("asdasdas", () => {
    const atm = ATM.of([
      { value: 5, type: "coin" },
      { value: 2, type: "coin" },
      { value: 1, type: "coin" },
    ]);

    const money = atm.withdraw(3);

    assert.deepEqual(money, [
      { value: 2, type: "coin", quantity: 1 },
      { value: 1, type: "coin", quantity: 1 },
    ] as Denomination[]);
  });

  it("dfñkaifjasds", () => {
    const atm = ATM.of([
      { value: 5, type: "coin" },
      { value: 2, type: "coin" },
      { value: 1, type: "coin" },
    ]);

    const money = atm.withdraw(4);

    assert.deepEqual(money, [{ value: 2, type: "coin", quantity: 2 }] as Denomination[]);
  });

  it("asdjoasijdoisjdosj", () => {
    const atm = ATM.of([
      { value: 5, type: "coin" },
      { value: 2, type: "coin" },
      { value: 1, type: "coin" },
    ]);

    const money = atm.withdraw(5);

    assert.deepEqual(money, [{ value: 5, type: "coin", quantity: 1 }] as Denomination[]);
  });

  it("wasakaka", () => {
    const atm = ATM.of([
      { value: 10, type: "coin" },
      { value: 5, type: "coin" },
      { value: 2, type: "coin" },
      { value: 1, type: "coin" },
    ]);

    const money = atm.withdraw(18);

    assert.deepEqual(money, [
      { value: 10, type: "coin", quantity: 1 },
      { value: 5, type: "coin", quantity: 1 },
      { value: 2, type: "coin", quantity: 1 },
      { value: 1, type: "coin", quantity: 1 },
    ] as Denomination[]);
  });

  it.skip("throws error if no available money", () => {
    const atm = ATM.of([{ value: 2, type: "coin" }]);

    assert.throws(() => atm.withdraw(1));
  });
});
