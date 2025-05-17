import type { Denomination } from "./Denomination.js";

export type Money = {
  value: number;
  type: string;
};

export class MoneyNew {
  public readonly value: number;
  public readonly type: string;

  constructor(value: number, type: string) {
    this.value = value;
    this.type = type;
  }

  public toDenomination2(quantity: number): Denomination {
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
