import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterUserUseCase } from './application/use-cases/register-user.use-case';
import { UserController } from './interface-adapters/controllers/user.controller';
import { USER_REPOSITORY } from './domain/repositories/user.repository';
import { TypeOrmUserRepository } from './infrastructure/typeorm/repositories/user.repository';
import { UserMapper } from './infrastructure/typeorm/mappers/user.mapper';
import { UserEntity } from './infrastructure/typeorm/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [UserController],
  providers: [
    RegisterUserUseCase,
    UserMapper,
    {
      provide: USER_REPOSITORY,
      useClass: TypeOrmUserRepository
    }
  ],
  exports: [USER_REPOSITORY],
})
export class UsersModule {}
