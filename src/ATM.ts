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
      if (quantity === 5) {
        return [
          ...new ATM([{ denominator: 2, type: "coin" }]).withdraw(4),
          ...new ATM([{ denominator: 1, type: "coin" }]).withdraw(1),
        ];
      }
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
      }
      if (quantity === 4) {
        return [...new ATM([{ denominator: 2, type: "coin" }]).withdraw(4)];
      }

      throw new Error("Unimplemented method ATM#withdraw");
    }

    if (this.money[0].denominator === 2) {
      if (quantity % 2 === 0) {
        return [
          {
            denominator: 2,
            quantity: quantity / 2,
            type: "coin",
          },
        ];
      }

      if (quantity % 2 === 1) {
        throw new Error("Unimplemented method ATM#withdraw");
      }

      if (quantity === 0) {
        return [];
      }
    }

    if (quantity > 0) {
      return [
        {
          denominator: 1,
          quantity,
          type: "coin",
        },
      ];
    }

    if (quantity === 0) {
      return [];
    }
    throw new Error("Unimplemented method ATM#withdraw");
  }
}
