// src/domain/card/services/card-request.service.ts

import { User } from '../../../users/domain/entities/user.entity';
import { CardType } from '../enums/card-type.enum';
import { Card } from '../entities/card.entity';
import { CardBrand } from '../enums/card-brand.enum';
import { CardEligibilityService } from './card-eligibility.service';
import { CardNumber } from '../value-objects/card-number.vo';
import { CardId } from '../value-objects/card-id.vo';

export class CardRequestService {
  static requestCard(user: User, type: CardType, brand: CardBrand): Card {
    if (!CardEligibilityService.isEligible(user, type)) {
      throw new Error('Usuário não possui renda ou idade suficiente para este tipo de cartão');
    }

    return new Card(
      new CardId(),
      user.cpf,
      CardNumber.generateRandom(),
      type,
      brand
    );
  }
}
