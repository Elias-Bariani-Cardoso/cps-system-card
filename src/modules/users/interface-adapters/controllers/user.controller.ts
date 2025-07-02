// interface-adapters/controllers/user.controller.ts

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
import { UsersService } from '../../application/services/user.service';
import { RegisterUserInput } from '../../application/use-cases/dtos/register-user.input';
import { UpdateUserInput } from '../../application/use-cases/dtos/update-user.input';
import { UserOutput } from '../../application/use-cases/dtos/user.output';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully', type: UserOutput })
  @ApiBody({ type: RegisterUserInput })
  async create(@Body() input: RegisterUserInput): Promise<UserOutput> {
    return this.usersService.create(input);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users', type: [UserOutput] })
  async findAll(): Promise<UserOutput[]> {
    return this.usersService.findAll();
  }

  @Get(':cpf')
  @ApiOperation({ summary: 'Get a user by CPF' })
  @ApiParam({ name: 'cpf', description: 'User CPF', example: '12345678900' })
  @ApiResponse({ status: 200, description: 'User found', type: UserOutput })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('cpf') cpf: string): Promise<UserOutput> {
    try {
      return await this.usersService.findOneByCpf(cpf);
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
    try {
      return await this.usersService.update(cpf, input);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Delete(':cpf')
  @ApiOperation({ summary: 'Delete a user by CPF' })
  @ApiParam({ name: 'cpf', description: 'User CPF', example: '12345678900' })
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('cpf') cpf: string): Promise<void> {
    try {
      await this.usersService.remove(cpf);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
