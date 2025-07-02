import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '../../domain/repositories/user.repository';
import { UserDtoMapper } from './mappers/user.dto.mapper';
import { UserOutput } from './dtos/user.output';
import { Cpf } from '../../domain/value-objects/cpf.vo';

@Injectable()
export class FindUserByCpfUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
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
