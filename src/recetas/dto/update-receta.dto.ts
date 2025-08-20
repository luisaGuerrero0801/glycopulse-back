import { CreateRolDto } from './../../roles/dto/create-role.dto';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateRecetaDto extends PartialType(CreateRolDto) {
  @IsString()
  @MinLength(1)
  @IsOptional()
  nombreReceta?: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  descripcionReceta?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  porcionesReceta?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  caloriasReceta: number;

  @IsString()
  @MinLength(1)
  @IsOptional()
  tiempoReceta?: string;

  @IsString()
  @IsOptional()
  imagenReceta?: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  nivelReceta?: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  categoriaReceta: string;

  @IsOptional()
  @IsInt()
  idUsuario?: number;
}
