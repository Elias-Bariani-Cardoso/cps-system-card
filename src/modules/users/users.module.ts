import { Module } from '@nestjs/common';
import { RegisterUserUseCase } from './application/use-cases/register-user.use-case';
import { UserController } from './interface-adapters/controllers/user.controller';
// Adicione outros providers conforme necessário (repositórios, mappers, etc.)

@Module({
  controllers: [UserController],
  providers: [RegisterUserUseCase],
})
export class UsersModule {}