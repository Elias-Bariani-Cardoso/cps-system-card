import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { RegisterUserInput } from './dtos/register-user.input';
import { UserOutput } from './dtos/user.output';
import { UserDtoMapper } from './mappers/user.dto.mapper';

@Injectable()
export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: RegisterUserInput): Promise<UserOutput> {
    const user = UserDtoMapper.toDomain(input);

    await this.userRepository.save(user);

    return UserDtoMapper.toOutput(user);
  }
}
