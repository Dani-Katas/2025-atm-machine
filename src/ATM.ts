type CountableMoney = {};

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
    return [];
  }
}
