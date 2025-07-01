import { v4 as uuidv4, validate as isUuid } from 'uuid';

export class TransactionId {
  constructor(public readonly value: string = uuidv4()) {
    if (!isUuid(this.value)) throw new Error('TransactionId inválido');
  }

  toString(): string {
    return this.value;
  }
}
