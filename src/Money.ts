import type { Denomination } from "./Denomination.js";

export type MoneyPrimitives = {
  value: number;
  type: string;
};

export class Money {
  public readonly value: number;
  public readonly type: string;

  constructor(value: number, type: string) {
    this.value = value;
    this.type = type;
  }

  public toDenomination(quantity: number): Denomination {
    return {
      value: this.value,
      quantity: (quantity - this.leftovers(quantity)) / this.value,
      type: "coin",
    };
  }

  public leftovers(quantity: number) {
    return quantity % this.value;
  }
}
