import { Cpf } from '../value-objects/cpf.vo';
import { BirthDate } from '../value-objects/birth-date.vo';
import { MonthlyIncome } from '../value-objects/monthly-income.vo';
import { Name } from '../value-objects/name.vo';

export class User {
  constructor(
    public readonly cpf: Cpf,
    public readonly name: Name,
    public readonly birthDate: BirthDate,
    public readonly monthlyIncome: MonthlyIncome
  ) {
    
  }

  isAdult(): boolean {
    return this.birthDate.isAdult();
  }
}


