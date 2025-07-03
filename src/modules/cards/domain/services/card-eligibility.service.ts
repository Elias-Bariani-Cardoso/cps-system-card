// src/domain/card/services/card-eligibility.service.ts

import { User } from '../../../users/domain/entities/user.entity';
import { CardType } from '../enums/card-type.enum';

export class CardEligibilityService {
  static isEligible(user: User, type: CardType): boolean {
    const income = user.monthlyIncome.getValue();

    if (!user.isAdult()) {
      return false;
    }

    if (type === CardType.CREDIT) return income >= 2000;
    if (type === CardType.DEBIT) return income >= 800;

    return false;
  }
}
