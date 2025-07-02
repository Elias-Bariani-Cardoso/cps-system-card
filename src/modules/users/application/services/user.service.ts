// application/services/users.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { Cpf } from '../../domain/value-objects/cpf.vo';
import { Name } from '../../domain/value-objects/name.vo';
import { BirthDate } from '../../domain/value-objects/birth-date.vo';
import { MonthlyIncome } from '../../domain/value-objects/monthly-income.vo';
import { RegisterUserInput } from '../use-cases/dtos/register-user.input';
import { UserDtoMapper } from '../use-cases/mappers/user.dto.mapper';
import { UserOutput } from '../use-cases/dtos/user.output';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository
  ) {}

  async create(input: RegisterUserInput): Promise<UserOutput> {
    const user = UserDtoMapper.toDomain(input);
    const savedUser = await this.userRepository.save(user);
    return UserDtoMapper.toOutput(savedUser);
  }

  async findAll(): Promise<UserOutput[]> {
    const users = await this.userRepository.findAll();
    return users.map(UserDtoMapper.toOutput);
  }

  async findOneByCpf(cpf: string): Promise<UserOutput> {
    const user = await this.userRepository.findByCpf(new Cpf(cpf));
    if (!user) {
      throw new NotFoundException(`Usuário com CPF ${cpf} não encontrado`);
    }
    return UserDtoMapper.toOutput(user);
  }

  async update(cpf: string, data: Partial<RegisterUserInput>): Promise<UserOutput> {
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

  async remove(cpf: string): Promise<void> {
    const found = await this.userRepository.findByCpf(new Cpf(cpf));
    if (!found) {
      throw new NotFoundException(`Usuário com CPF ${cpf} não encontrado`);
    }

    await this.userRepository.deleteByCpf(found.cpf);
  }
}
