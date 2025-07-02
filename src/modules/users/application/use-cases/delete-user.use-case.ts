import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '../../domain/repositories/user.repository';
import { Cpf } from '../../domain/value-objects/cpf.vo';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(cpf: string): Promise<void> {
    const user = await this.userRepository.findByCpf(new Cpf(cpf));
    if (!user) {
      throw new NotFoundException(`Usuário com CPF ${cpf} não encontrado`);
    }
    await this.userRepository.deleteByCpf(user.cpf);
  }
}
