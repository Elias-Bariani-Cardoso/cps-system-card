import { Injectable } from '@nestjs/common';
import { User } from '../../../domain/entities/user.entity';
import { UserEntity } from '../entities/user.entity';
import { Cpf } from '../../../domain/value-objects/cpf.vo';
import { BirthDate } from '../../../domain/value-objects/birth-date.vo';
import { MonthlyIncome } from '../../../domain/value-objects/monthly-income.vo';
import { Name } from '../../../domain/value-objects/name.vo';

@Injectable()
export class UserMapper {
  toDomain(entity: UserEntity): User {
    return new User(
      new Cpf(entity.cpf),
      new Name(entity.fullName),
      new BirthDate(entity.birthDate),
      new MonthlyIncome(entity.monthlyIncome)
    );
  }

  toPersistence(user: User): Partial<UserEntity> {
    return {
      cpf: user.cpf.getValue(),
      fullName: user.name.getValue(),
      birthDate: user.birthDate.getValue(),
      monthlyIncome: user.monthlyIncome.getValue(),
    };
  }
}
