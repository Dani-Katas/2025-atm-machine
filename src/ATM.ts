import type { CountableMoney } from "./CountableMoney.js";
import type { Money } from "./Money.js";
import { Monises } from "./Monises.ts";

export class ATM {
  private money: Money[];

  constructor(money: Money[]) {
    this.money = money;
  }

  withdraw(quantity: number): Array<CountableMoney> {
    if (this.money.length === 0) {
      if (quantity === 0) {
        return [];
      } else {
        throw new Error("Unimplemented method ATM#withdraw");
      }
    }

    const [current, ...restOfMonises] = this.money;
    const restNextMoney = quantity % current.denominator;
    const currentMoneyAmount = quantity - restNextMoney;
    const value = {
      denominator: current.denominator,
      quantity: currentMoneyAmount / current.denominator,
      type: "coin",
    };

    return new Monises([value, ...new ATM(restOfMonises).withdraw(restNextMoney)]).toArray();
  }
}
