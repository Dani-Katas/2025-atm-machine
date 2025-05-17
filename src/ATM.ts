import type { Denomination } from "./Denomination.js";
import { type Money, MoneyNew } from "./Money.ts";
import { Cash } from "./Cash.ts";

export class ATM {
  private readonly money2: MoneyNew[];

  public static of(money: Array<Money>): ATM {
    if (!money.length) return new EmptyATM();
    return new ATM(money);
  }

  protected constructor(money: Array<Money>) {
    this.money2 = money.map((m) => new MoneyNew(m.value, m.type));
  }

  withdraw(quantity: number): Array<Denomination> {
    const [current, ...money] = this.money2;
    const leftovers = current.leftovers(quantity);
    return new Cash([
      current.toDenomination(quantity),
      ...ATM.of(money).withdraw(leftovers),
    ]).toArray();
  }
}

class EmptyATM extends ATM {
  constructor() {
    super([]);
  }

  withdraw(quantity: number): Array<Denomination> {
    if (quantity !== 0) {
      throw new Error("Unimplemented method ATM#withdraw");
    }

    return [];
  }
}
