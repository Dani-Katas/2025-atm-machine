import type { CountableMoney } from "./CountableMoney.js";
import type { Money } from "./Money.js";
import { Monises } from "./Monises.ts";

export class ATM {
  private readonly money: Money[];

  public static of(money: Money[]): ATM {
    if (!money.length) return new EmptyATM();
    return new ATM(money);
  }

  protected constructor(money: Money[]) {
    this.money = money;
  }

  withdraw(quantity: number): Array<CountableMoney> {
    const [current, ...money] = this.money;
    const leftovers = quantity % current.denominator;
    const value = {
      denominator: current.denominator,
      quantity: (quantity - leftovers) / current.denominator,
      type: "coin",
    };
    return new Monises([value, ...ATM.of(money).withdraw(leftovers)]).toArray();
  }
}

class EmptyATM extends ATM {
  constructor() {
    super([]);
  }

  withdraw(quantity: number): Array<CountableMoney> {
    if (quantity !== 0) {
      throw new Error("Unimplemented method ATM#withdraw");
    }

    return [];
  }
}
