import type { CountableMoney } from "./CountableMoney.js";
import type { Money } from "./Money.js";

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
    if (value.quantity === 0) {
      return [...new ATM(restOfMonises).withdraw(restNextMoney)];
    } else {
      return [value, ...new ATM(restOfMonises).withdraw(restNextMoney)];
    }
  }
}
