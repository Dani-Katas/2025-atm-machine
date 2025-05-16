type CountableMoney = {};

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
    return [];
  }
}
