export class CardNumber {
  private readonly value: string;

  constructor(value: string) {
    if (!/^\d{16}$/.test(value)) {
      throw new Error('Número do cartão deve conter 16 dígitos numéricos');
    }

    this.value = value;
  }

  getValue(): string {
    return this.value;
  }

  getMasked(): string {
    return this.value.replace(/^(\d{4})\d{8}(\d{4})$/, '$1********$2');
  }

  static generateRandom(): CardNumber {
    const num = Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString();
    return new CardNumber(num);
  }
}
