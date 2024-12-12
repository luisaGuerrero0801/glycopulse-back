import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @MinLength(3)
  nombresUsuario: string;

  @IsString()
  @MinLength(3)
  apellidosUsuario: string;

  @IsString()
  fechaNacimientoUsuario: string;

  @IsString()
  @MinLength(1)
  generoUsuario: string;

  @IsEmail()
  @MinLength(10)
  @IsNotEmpty()
  correoUsuario: string;

  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  contrasenaUsuario: string;

  @IsString()
  @MinLength(3)
  rolUsuario: string;
}
