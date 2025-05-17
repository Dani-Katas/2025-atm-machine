import type { Denomination } from "./Denomination.js";
import { type MoneyPrimitives, Money } from "./Money.ts";
import { Cash } from "./Cash.ts";

export class ATM {
  private readonly money: Money[];

  public static of(money: Array<MoneyPrimitives>): ATM {
    if (!money.length) return new EmptyATM();
    return new ATM(money);
  }

  protected constructor(money: Array<MoneyPrimitives>) {
    this.money = money.map((m) => new Money(m.value, m.type));
  }

  withdraw(quantity: number): Array<Denomination> {
    return this.retrieve(this.money, quantity);
  }

  private retrieve([current, ...money]: Money[], quantity: number) {
    const atm = ATM.of(money);
    const denomination = current.toDenomination(quantity);
    return new Cash([denomination, ...atm.withdraw(current.leftovers(quantity))]).toArray();
  }
}

class EmptyATM extends ATM {
  constructor() {
    super([]);
  }

  withdraw(quantity: number): Array<Denomination> {
    if (quantity !== 0) {
      throw new Error("Not enough founds");
    }

    return [];
  }
}
