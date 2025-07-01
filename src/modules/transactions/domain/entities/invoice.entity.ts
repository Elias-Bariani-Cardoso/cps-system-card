import { InvoiceId } from "../value-objects/invoice-id.vo";
import { CardId } from '../../../cards/domain/value-objects/card-id.vo';
import { DueDate } from "../value-objects/due-date.vo";
import { Transaction } from "./transaction.entity";
import { InvoiceStatus } from "../enums/invoice-status.enum";

export class Invoice {
  constructor(
    public readonly id: InvoiceId,
    public readonly cardId: CardId,
    public readonly dueDate: DueDate,
    public readonly transactions: Transaction[],
    public status: InvoiceStatus
  ) {}

  getTotal(): number {
    return this.transactions.reduce((acc, t) => acc + t.amount.getValue(), 0);
  }

  isOverdue(today: Date = new Date()): boolean {
    return this.dueDate.value < today && this.status !== InvoiceStatus.PAGA;
  }
}
