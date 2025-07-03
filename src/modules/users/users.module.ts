import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './interface-adapters/controllers/user.controller';
import { UserEntity } from './infrastructure/typeorm/entities/user.entity';
import { TypeOrmUserRepository } from './infrastructure/typeorm/repositories/user.repository';
//import { USER_REPOSITORY } from './domain/repositories/user.repository';
import { UserMapper } from './infrastructure/typeorm/mappers/user.mapper';

import { RegisterUserUseCase } from './application/use-cases/register-user.use-case';
import { FindAllUsersUseCase } from './application/use-cases/find-all-users.use-case';
import { FindUserByCpfUseCase } from './application/use-cases/find-user-by-cpf.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from './application/use-cases/delete-user.use-case';
import { User } from './domain/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, User])],
  controllers: [UserController],
  providers: [
    RegisterUserUseCase,
    FindAllUsersUseCase,
    FindUserByCpfUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    UserMapper,
    TypeOrmUserRepository,
  ],
  exports: [
    RegisterUserUseCase,
    FindAllUsersUseCase,
    FindUserByCpfUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    UserMapper,
    TypeOrmUserRepository
  ]
})
export class UsersModule {}