import { type } from "node:os";

export type Money = {
  value: number;
  type: string;
};

export class MoneyNew {
  public readonly value: number;
  public readonly type: string;

  constructor(value: number, type: string) {
    this.value = value;
    this.type = type;
  }
}
