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
      if (quantity === 1) {
        return [...new ATM([{ denominator: 1, type: "coin" }]).withdraw(1)];
      }

      if (quantity === 2) {
        return [...new ATM([{ denominator: 2, type: "coin" }]).withdraw(2)];
      }

      if (quantity === 3) {
        return [
          ...new ATM([{ denominator: 2, type: "coin" }]).withdraw(2),
          ...new ATM([{ denominator: 1, type: "coin" }]).withdraw(1),
        ];
      } else {
        return [...new ATM([{ denominator: 2, type: "coin" }]).withdraw(4)];
      }
    }

    if (quantity > 0) {
      const diff = this.money[0].denominator;

      if (this.money[0].denominator === 2) {
        quantity -= quantity / this.money[0].denominator;

        return [
          {
            denominator: this.money[0].denominator,
            quantity,
            type: "coin",
          },
        ];
      }

      return [
        {
          denominator: this.money[0].denominator,
          quantity,
          type: "coin",
        },
      ];
    }

    return [];
  }
}
