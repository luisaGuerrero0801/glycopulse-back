import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @MinLength(10)
  @IsNotEmpty()
  correoUsuario: string;

  @IsString()
  @IsNotEmpty()
  contrasenaUsuario: string;
}
