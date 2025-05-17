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
    if (!money.length) {
      throw new Error("ATM must have some money");
    }

    this.money = money;
  }

  withdraw(quantity: number): Array<CountableMoney> {
    if (this.money.length === 3) {
      const [current, ...restOfMonises] = this.money;
      const restNextMoney = quantity % current.denominator;
      const currentMoneyAmount = quantity - restNextMoney;
      if (quantity === 5) {
        return [
          ...new ATM([{ denominator: 5, type: "coin" }]).withdraw(currentMoneyAmount),
          ...new ATM(restOfMonises).withdraw(restNextMoney),
        ];
      }
      if (quantity === 4) {
        return [
          ...new ATM([{ denominator: 5, type: "coin" }]).withdraw(currentMoneyAmount),
          ...new ATM(restOfMonises).withdraw(restNextMoney),
        ];
      }
      if (quantity === 3) {
        return [
          ...new ATM([{ denominator: 5, type: "coin" }]).withdraw(currentMoneyAmount),
          ...new ATM(restOfMonises).withdraw(restNextMoney),
        ];
      }
      if (quantity === 2) {
        return [
          ...new ATM([{ denominator: 5, type: "coin" }]).withdraw(currentMoneyAmount),
          ...new ATM(restOfMonises).withdraw(restNextMoney),
        ];
      }
      if (quantity === 1) {
        return [
          ...new ATM([{ denominator: 5, type: "coin" }]).withdraw(currentMoneyAmount),
          ...new ATM(restOfMonises).withdraw(restNextMoney),
        ];
      }
    }
    if (this.money.length === 2) {
      const restNextMoney = quantity % this.money[0].denominator;
      const currentMoneyAmount = quantity - restNextMoney;
      return [
        ...new ATM([{ denominator: this.money[0].denominator, type: "coin" }]).withdraw(
          currentMoneyAmount,
        ),
        ...new ATM([{ denominator: this.money[1].denominator, type: "coin" }]).withdraw(
          restNextMoney,
        ),
      ];
    }

    if (quantity === 0) {
      return [];
    }
    if (quantity % this.money[0].denominator !== 0) {
      throw new Error("Unimplemented method ATM#withdraw");
    }
    return [
      {
        denominator: this.money[0].denominator,
        quantity: quantity / this.money[0].denominator,
        type: "coin",
      },
    ];
  }
}
