import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserDtoMapper } from './mappers/user.dto.mapper';
import { UserOutput } from './dtos/user.output';
import { Cpf } from '../../domain/value-objects/cpf.vo';
import { TypeOrmUserRepository } from '../../infrastructure/typeorm/repositories/user.repository';

@Injectable()
export class FindUserByCpfUseCase {
  constructor(
    @Inject(TypeOrmUserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(cpf: string): Promise<UserOutput> {
    const user = await this.userRepository.findByCpf(new Cpf(cpf));
    if (!user) {
      throw new NotFoundException(`Usuário com CPF ${cpf} não encontrado`);
    }
    return UserDtoMapper.toOutput(user);
  }
}
