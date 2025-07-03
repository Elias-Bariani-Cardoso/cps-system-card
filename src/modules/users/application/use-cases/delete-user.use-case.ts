import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { Cpf } from '../../domain/value-objects/cpf.vo';
import { TypeOrmUserRepository } from '../../infrastructure/typeorm/repositories/user.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(TypeOrmUserRepository)
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
