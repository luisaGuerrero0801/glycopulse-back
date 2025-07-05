import { IsEmail, IsNotEmpty } from 'class-validator';

export class RecoverAccountDto {
  @IsEmail()
  @IsNotEmpty()
  correo: string;
}
