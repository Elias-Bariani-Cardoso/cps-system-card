import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { RegisterUserInput } from './dtos/register-user.input';
import { UserDtoMapper } from './mappers/user.dto.mapper';
import { UserOutput } from './dtos/user.output';
import { TypeOrmUserRepository } from '../../infrastructure/typeorm/repositories/user.repository';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject(TypeOrmUserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: RegisterUserInput): Promise<UserOutput> {
    const user = UserDtoMapper.toDomain(input);
    const saved = await this.userRepository.save(user);
    return UserDtoMapper.toOutput(saved);
  }
}
