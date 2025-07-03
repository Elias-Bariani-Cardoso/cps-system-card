import { v4 as uuidv4, validate as isUuid } from 'uuid';

export class CardId {
  private readonly value: string;

  constructor(value?: string) {
    if (value && !isUuid(value)) {
      throw new Error('CardId inválido');
    }

    this.value = value ?? uuidv4();
  }

  getValue(): string {
    return this.value;
  }
}
