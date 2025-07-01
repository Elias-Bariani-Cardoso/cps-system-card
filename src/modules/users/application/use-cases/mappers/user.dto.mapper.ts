// ./mappers/user.dto.mapper.ts

import { RegisterUserInput } from '../dtos/register-user.input';
import { UserOutput } from '../dtos/user.output';
import { User } from '../../../domain/entities/user.entity';
import { Cpf } from '../../../domain/value-objects/cpf.vo';
import { Name } from '../../../domain/value-objects/name.vo';
import { BirthDate } from '../../../domain/value-objects/birth-date.vo';
import { MonthlyIncome } from '../../../domain/value-objects/monthly-income.vo';

export class UserDtoMapper {
  static toDomain(dto: RegisterUserInput): User {
    return new User(
      new Cpf(dto.cpf),
      new Name(dto.name),
      new BirthDate(new Date(dto.birthDate)),
      new MonthlyIncome(dto.income)
    );
  }

  static toOutput(user: User): UserOutput {
    return {
      cpf: user.cpf.getValue(),
      name: user.name.getValue(),
      birthDate: user.birthDate.getValue(),
    };
  }
}
