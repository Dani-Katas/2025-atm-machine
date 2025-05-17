import type { CountableMoney } from "./CountableMoney.js";

export class Monises {
  private money: CountableMoney[];

  constructor(money: CountableMoney[]) {
    this.money = money.filter((m) => m.quantity);
  }

  toArray() {
    return this.money;
  }
}
