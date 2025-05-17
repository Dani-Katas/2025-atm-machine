import type { CountableMoney } from "./CountableMoney.js";
import type { Money } from "./Money.js";
import { Monises } from "./Monises.ts";

export class ATM {
  private money: Money[];

  public static of(money: Money[]): ATM {
    if (!money.length) return new EmptyATM();

    return new ATM(money);
  }

  private constructor(money: Money[]) {
    this.money = money;
  }

  withdraw(quantity: number): Array<CountableMoney> {
    const [current, ...restOfMonises] = this.money;
    const restNextMoney = quantity % current.denominator;
    const currentMoneyAmount = quantity - restNextMoney;
    const value = {
      denominator: current.denominator,
      quantity: currentMoneyAmount / current.denominator,
      type: "coin",
    };

    return new Monises([value, ...ATM.of(restOfMonises).withdraw(restNextMoney)]).toArray();
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
