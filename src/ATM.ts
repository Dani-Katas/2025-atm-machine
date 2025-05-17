import type { Denomination } from "./Denomination.js";
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

  withdraw(quantity: number): Array<Denomination> {
    const [current, ...money] = this.money;
    const leftovers = quantity % current.value;
    const value: Denomination = {
      value: current.value,
      quantity: (quantity - leftovers) / current.value,
      type: "coin",
    };
    return new Monises([value, ...ATM.of(money).withdraw(leftovers)]).toArray();
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
