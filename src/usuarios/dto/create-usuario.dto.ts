import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsInt,
  IsIn,
  IsOptional,
  Matches,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @MinLength(3)
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
    message: 'El nombre solo debe contener letras y espacios',
  })
  @IsNotEmpty()
  nombresUsuario: string;

  @IsString()
  @MinLength(3)
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
    message: 'El apellido solo debe contener letras y espacios',
  })
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
  @MinLength(9)
  @IsNotEmpty()
  celularUsuario: string;

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

  @IsOptional()
  @IsInt()
  idUsuarioResponsable?: number;
}
