export class HashedPassword {
  private readonly value: string;

  constructor(value: string) {
    if (!value || value.length < 60) {
      throw new Error('Hash de senha inválido');
    }

    this.value = value;
  }

  getValue(): string {
    return this.value;
  }
}
