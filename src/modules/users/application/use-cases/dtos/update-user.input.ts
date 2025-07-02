import { PartialType } from '@nestjs/swagger';
import { RegisterUserInput } from './register-user.input';

export class UpdateUserInput extends PartialType(RegisterUserInput) {}
