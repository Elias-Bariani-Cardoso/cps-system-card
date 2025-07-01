import {
  IsDateString,
  IsNotEmpty,
  IsString,
  Matches,
  IsNumber,
  Min
} from 'class-validator';

export class RegisterUserInput {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @Matches(/^[0-9]{11}$/, { message: 'CPF must be 11 digits' })
  cpf: string;

  @IsDateString()
  birthDate: Date;

  @IsNumber()
  @Min(0)
  income: number;
}
