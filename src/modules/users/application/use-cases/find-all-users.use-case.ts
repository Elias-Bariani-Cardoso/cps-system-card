import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '../../domain/repositories/user.repository';
import { UserDtoMapper } from './mappers/user.dto.mapper';
import { UserOutput } from './dtos/user.output';

@Injectable()
export class FindAllUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(): Promise<UserOutput[]> {
    const users = await this.userRepository.findAll();
    return users.map(UserDtoMapper.toOutput);
  }
}
