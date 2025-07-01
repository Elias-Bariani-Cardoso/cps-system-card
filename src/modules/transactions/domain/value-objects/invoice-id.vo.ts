import { v4 as uuidv4, validate as isUuid } from 'uuid';

export class InvoiceId {
  constructor(public readonly value: string = uuidv4()) {
    if (!isUuid(this.value)) throw new Error('InvoiceId inválido');
  }

  toString(): string {
    return this.value;
  }
}
