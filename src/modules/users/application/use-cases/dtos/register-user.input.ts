import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsString,
  Matches,
  IsNumber,
  Min
} from 'class-validator';

export class RegisterUserInput {
  @ApiProperty({ example: 'João da Silva' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '12345678900' })
  @IsNotEmpty()
  @Matches(/^[0-9]{11}$/, { message: 'CPF must be 11 digits' })
  cpf: string;

  @ApiProperty({ example: '2000-01-01' })
  @IsDateString()
  birthDate: Date;

  @ApiProperty({ example: 2500.75 })
  @IsNumber()
  @Min(0)
  income: number;
}
