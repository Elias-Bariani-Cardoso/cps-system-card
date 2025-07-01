import { TransactionId } from '../value-objects/transaction-id.vo';
import { CardId } from '../../../cards/domain/value-objects/card-id.vo';
import { TransactionType } from '../enums/transaction-type.enums';
import { TransactionAmount } from '../value-objects/transaction-amount.vo';

export class Transaction {
  constructor(
    public readonly id: TransactionId,
    public readonly cardId: CardId,
    public readonly description: string,
    public readonly type: TransactionType,
    public readonly amount: TransactionAmount,
    public readonly occurredAt: Date
  ) {}
}
