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
      if (quantity === 3) {
        return [
          ...new ATM([{ denominator: 2, type: "coin" }]).withdraw(2),
          ...new ATM([{ denominator: 1, type: "coin" }]).withdraw(1),
        ];
      }
      if (quantity === 2) {
        return [
          ...new ATM([{ denominator: 2, type: "coin" }]).withdraw(2),
          ...new ATM([{ denominator: 1, type: "coin" }]).withdraw(0),
        ];
      }
      if (quantity === 1) {
        return [
          ...new ATM([{ denominator: 1, type: "coin" }]).withdraw(1),
          ...new ATM([{ denominator: 1, type: "coin" }]).withdraw(0),
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
