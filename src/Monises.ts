import type { Denomination } from "./Denomination.js";

export class Monises {
  private money: Denomination[];

  constructor(money: Denomination[]) {
    this.money = money.filter((m) => m.quantity);
  }

  toArray() {
    return this.money;
  }
}
