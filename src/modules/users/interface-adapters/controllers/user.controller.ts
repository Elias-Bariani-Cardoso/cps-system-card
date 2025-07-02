import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';
import { FindAllUsersUseCase } from '../../application/use-cases/find-all-users.use-case';
import { FindUserByCpfUseCase } from '../../application/use-cases/find-user-by-cpf.use-case';
import { UpdateUserUseCase, UpdateUserInput } from '../../application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.use-case';
import { RegisterUserInput } from '../../application/use-cases/dtos/register-user.input';
import { UserOutput } from '../../application/use-cases/dtos/user.output';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly findUserByCpfUseCase: FindUserByCpfUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully', type: UserOutput })
  @ApiBody({ type: RegisterUserInput })
  async create(@Body() input: RegisterUserInput): Promise<UserOutput> {
    return this.registerUserUseCase.execute(input);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users', type: [UserOutput] })
  async findAll(): Promise<UserOutput[]> {
    return this.findAllUsersUseCase.execute();
  }

  @Get(':cpf')
  @ApiOperation({ summary: 'Get a user by CPF' })
  @ApiParam({ name: 'cpf', description: 'User CPF', example: '12345678900' })
  @ApiResponse({ status: 200, description: 'User found', type: UserOutput })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('cpf') cpf: string): Promise<UserOutput> {
    try {
      return await this.findUserByCpfUseCase.execute(cpf);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Put(':cpf')
  @ApiOperation({ summary: 'Update a user by CPF' })
  @ApiParam({ name: 'cpf', description: 'User CPF', example: '12345678900' })
  @ApiBody({ type: UpdateUserInput })
  @ApiResponse({ status: 200, description: 'User updated successfully', type: UserOutput })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(
    @Param('cpf') cpf: string,
    @Body() input: UpdateUserInput,
  ): Promise<UserOutput> {
    return this.updateUserUseCase.execute(cpf, input);
  }

  @Delete(':cpf')
  @ApiOperation({ summary: 'Delete a user by CPF' })
  @ApiParam({ name: 'cpf', description: 'User CPF', example: '12345678900' })
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('cpf') cpf: string): Promise<void> {
    return this.deleteUserUseCase.execute(cpf);
  }
}
