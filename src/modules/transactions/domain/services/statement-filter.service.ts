import { Transaction } from "../entities/transaction.entity";
import { TransactionType } from "../enums/transaction-type.enums";

export class StatementFilterService {
  static filter(transactions: Transaction[], filters: {
    from?: Date,
    to?: Date,
    type?: TransactionType,
    minValue?: number,
    maxValue?: number
  }): Transaction[] {
    return transactions.filter(t => {
      const isAfterStart = !filters.from || t.occurredAt >= filters.from;
      const isBeforeEnd = !filters.to || t.occurredAt <= filters.to;
      const matchesType = !filters.type || t.type === filters.type;
      const matchesMin = !filters.minValue || t.amount.getValue() >= filters.minValue;
      const matchesMax = !filters.maxValue || t.amount.getValue() <= filters.maxValue;
      return isAfterStart && isBeforeEnd && matchesType && matchesMin && matchesMax;
    });
  }
}
