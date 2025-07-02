import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';
import { RegisterUserInput } from '../../application/use-cases/dtos/register-user.input';
import { UserOutput } from '../../application/use-cases/dtos/user.output';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Registrar novo usuário' })
  @ApiResponse({ 
    status: 201, 
    description: 'Usuário criado com sucesso',
    type: UserOutput
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async register(@Body() input: RegisterUserInput): Promise<UserOutput> {
    return this.registerUserUseCase.execute(input);
  }
}