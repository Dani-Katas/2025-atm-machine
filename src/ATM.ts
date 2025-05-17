import type { Denomination } from "./Denomination.js";
import { type Money, MoneyNew } from "./Money.ts";
import { Cash } from "./Cash.ts";

export class ATM {
  private readonly money: MoneyNew[];

  public static of(money: Array<Money>): ATM {
    if (!money.length) return new EmptyATM();
    return new ATM(money);
  }

  protected constructor(money: Array<Money>) {
    this.money = money.map((m) => new MoneyNew(m.value, m.type));
  }

  withdraw(quantity: number): Array<Denomination> {
    const [current, ...money] = this.money;
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
      throw new Error("Unimplemented method ATM#withdraw");
    }

    return [];
  }
}
