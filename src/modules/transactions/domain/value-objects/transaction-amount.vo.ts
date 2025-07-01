export class TransactionAmount {
  constructor(private readonly value: number) {
    if (value <= 0) {
      throw new Error('O valor da transação deve ser positivo');
    }
  }

  getValue(): number {
    return this.value;
  }
}
