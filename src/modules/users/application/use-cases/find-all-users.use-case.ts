import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserDtoMapper } from './mappers/user.dto.mapper';
import { UserOutput } from './dtos/user.output';
import { TypeOrmUserRepository } from '../../infrastructure/typeorm/repositories/user.repository';

@Injectable()
export class FindAllUsersUseCase {
  constructor(
    @Inject(TypeOrmUserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(): Promise<UserOutput[]> {
    const users = await this.userRepository.findAll();
    return users.map(UserDtoMapper.toOutput);
  }
}
