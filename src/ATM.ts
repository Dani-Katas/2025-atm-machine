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
    if (this.money.length === 2) {
      const foo = quantity % this.money[0].denominator;
      const baz = quantity - foo;
      return [
        ...new ATM([{ denominator: this.money[0].denominator, type: "coin" }]).withdraw(baz),
        ...new ATM([{ denominator: this.money[1].denominator, type: "coin" }]).withdraw(foo),
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
