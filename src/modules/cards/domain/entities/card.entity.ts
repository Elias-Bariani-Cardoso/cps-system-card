import { CardStatus } from '../enums/card-status.enum';
import { CardNumber } from '../value-objects/card-number.vo';
import { CardType } from '../enums/card-type.enum';
import { CardBrand } from '../enums/card-brand.enum';
import { Cpf } from '../../../users/domain/value-objects/cpf.vo'
import { HashedPassword } from '../value-objects/hashed-password.vo';

export class Card {
  constructor(
    public readonly id: string,
    public readonly ownerCpf: Cpf,
    public readonly number: CardNumber, 
    public readonly type: CardType,
    public readonly brand: CardBrand,
    public status: CardStatus = CardStatus.SOLICITADO,
    public passwordHash?: HashedPassword,
  ) {
  }

  activate(passwordHash: string): void {
  if (![CardStatus.APROVADO, CardStatus.ENTREGUE].includes(this.status)) {
    throw new Error('Cartão não pode ser ativado no estado atual.');
  }

  this.status = CardStatus.ATIVO;
  this.passwordHash = new HashedPassword(passwordHash);
  }

  blockTemporarily(): void {
    this.status = CardStatus.BLOQUEADO_TEMPORARIO;
  }

  reportLossOrTheft(): void {
    this.status = CardStatus.BLOQUEADO_PERDA_ROUBO;
  }

  cancel(): void {
    this.status = CardStatus.CANCELADO;
  }
}
