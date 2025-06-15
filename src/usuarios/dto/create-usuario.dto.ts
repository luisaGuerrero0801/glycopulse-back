import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsInt,
  IsIn,
  IsOptional
} from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  nombresUsuario: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  apellidosUsuario: string;

  @IsString()
  @IsNotEmpty()
  fechaNacimientoUsuario: string;

  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  generoUsuario: string;

  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  rhUsuario: string;

  @IsEmail()
  @MinLength(10)
  @IsNotEmpty()
  correoUsuario: string;

  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  contrasenaUsuario: string;

  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  ciudadUsuario: string;

  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  paisUsuario: string;

  @IsNotEmpty()
  @IsInt()
  idRol: number;

  
  @IsOptional()
  @IsIn(['Activo', 'Inactivo'])
  estado?: string;
}
