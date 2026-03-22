export class Money {
  private constructor(private readonly paiseValue: number) {}

  static fromPaise(value: number): Money {
    if (!Number.isInteger(value) || value < 0) {
      throw new Error("Money must be a non-negative integer in paise");
    }
    return new Money(value);
  }

  static fromRupees(value: number): Money {
    return Money.fromPaise(Math.round(value * 100));
  }

  get paise(): number {
    return this.paiseValue;
  }

  get rupees(): number {
    return this.paiseValue / 100;
  }

  add(other: Money): Money {
    return Money.fromPaise(this.paiseValue + other.paise);
  }

  subtract(other: Money): Money {
    if (this.paiseValue < other.paise) {
      throw new Error("Insufficient amount");
    }
    return Money.fromPaise(this.paiseValue - other.paise);
  }
}
