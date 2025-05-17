import type { Denomination } from "./Denomination.js";
import { type Money, MoneyNew } from "./Money.ts";
import { Cash } from "./Cash.ts";

export class ATM {
  private readonly money: Money[];
  private readonly money2: Money[];

  public static of(money: Array<Money>): ATM {
    if (!money.length) return new EmptyATM();
    return new ATM(money);
  }

  protected constructor(money: Array<Money>) {
    this.money = money;
    this.money2 = money.map((m) => new MoneyNew(m.value, m.type));
  }

  withdraw(quantity: number): Array<Denomination> {
    const [current, ...money] = this.money;
    const leftovers = quantity % current.value;
    const value: Denomination = {
      value: current.value,
      quantity: (quantity - leftovers) / current.value,
      type: "coin",
    };
    return new Cash([value, ...ATM.of(money).withdraw(leftovers)]).toArray();
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
