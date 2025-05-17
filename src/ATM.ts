export type CountableMoney = {
  denominator: number;
  type: string;
  quantity: number;
};

type Money = {
  denominator: number;
  type: string;
};

export class ATM {
  private money: Money[];

  constructor(money: Money[]) {
    this.money = money;
  }

  withdraw(quantity: number): Array<CountableMoney> {
    if (this.money.length > 1) {
      const [current, ...restOfMonises] = this.money;
      const restNextMoney = quantity % current.denominator;
      const currentMoneyAmount = quantity - restNextMoney;
      return [
        ...new ATM([current]).withdraw(currentMoneyAmount),
        ...new ATM(restOfMonises).withdraw(restNextMoney),
      ];
    }

    const [current, ...restOfMonises] = this.money;
    const restNextMoney = quantity % current.denominator;
    const currentMoneyAmount = quantity - restNextMoney;
    const value = {
      denominator: current.denominator,
      quantity: currentMoneyAmount / current.denominator,
      type: "coin",
    };

    if (quantity === 0) {
      return [];
    }
    if (quantity % currentMoneyAmount !== 0) {
      return new ATM([]).withdraw(quantity);
    }

    if (this.money.length === 0) {
      if (quantity === 0) {
        return [];
      } else {
        throw new Error("Unimplemented method ATM#withdraw");
      }
    }

    return [value];
  }
}
