export class DueDate {
  constructor(public readonly value: Date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (value < today) {
      throw new Error('A data de vencimento não pode estar no passado');
    }
  }

  toString(): string {
    return this.value.toISOString().split('T')[0];
  }
}
