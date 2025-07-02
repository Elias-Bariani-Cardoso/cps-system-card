import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '../../domain/repositories/user.repository';
import { PartialType } from '@nestjs/swagger';
import { RegisterUserInput } from './dtos/register-user.input';
import { UserDtoMapper } from './mappers/user.dto.mapper';
import { UserOutput } from './dtos/user.output';
import { User } from '../../domain/entities/user.entity';
import { Cpf } from '../../domain/value-objects/cpf.vo';
import { Name } from '../../domain/value-objects/name.vo';
import { BirthDate } from '../../domain/value-objects/birth-date.vo';
import { MonthlyIncome } from '../../domain/value-objects/monthly-income.vo';

export class UpdateUserInput extends PartialType(RegisterUserInput) {}

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(cpf: string, data: Partial<RegisterUserInput>): Promise<UserOutput> {
    const existing = await this.userRepository.findByCpf(new Cpf(cpf));
    if (!existing) {
      throw new NotFoundException(`Usuário com CPF ${cpf} não encontrado`);
    }

    const updatedUser = new User(
      new Cpf(data.cpf ?? existing.cpf.getValue()),
      new Name(data.name ?? existing.name.getValue()),
      new BirthDate(new Date(data.birthDate ?? existing.birthDate.getValue())),
      new MonthlyIncome(data.income ?? existing.monthlyIncome.getValue())
    );

    const saved = await this.userRepository.save(updatedUser);
    return UserDtoMapper.toOutput(saved);
  }
}
