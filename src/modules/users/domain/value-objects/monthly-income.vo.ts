export class MonthlyIncome {
  constructor(private readonly value: number) {
    if (value < 0) {
      throw new Error('Renda não pode ser negativa');
    }
  }

  getValue(): number {
    return this.value;
  }
}
