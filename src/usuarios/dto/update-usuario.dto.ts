import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  IsInt,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  @IsString()
  @MinLength(3)
  @IsOptional()
  nombresUsuario?: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  apellidosUsuario?: string;

  @IsString()
  @IsOptional()
  fechaNacimientoUsuario?: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  generoUsuario?: string;

  @IsString()
  @MinLength(2)
  @IsOptional()
  rhUsuario: string;

  @IsEmail()
  @MinLength(10)
  @IsOptional()
  correoUsuario?: string;

  @IsString()
  @MinLength(4)
  @IsOptional()
  contrasenaUsuario?: string;

  @IsString()
  @MinLength(4)
  @IsOptional()
  ciudadUsuario?: string;

  @IsString()
  @MinLength(4)
  @IsOptional()
  paisenaUsuario?: string;

  @IsOptional()
  @IsInt()
  idRol?: number;
}
