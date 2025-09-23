import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateRecetaDto } from './create-receta.dto';
import { Type } from 'class-transformer';
import { UpdateIngredientesRecetaDto } from 'src/ingredientes-receta/dto/update-ingredientes-receta.dto';
import { UpdatePasosRecetaDto } from 'src/pasos-recetas/dto/update-pasos-receta.dto';

export class UpdateRecetaDto extends PartialType(
  OmitType(CreateRecetaDto, ['ingredientes', 'pasos'] as const)
) {
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
  caloriasReceta?: number;

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
  categoriaReceta?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateIngredientesRecetaDto)
  ingredientes?: UpdateIngredientesRecetaDto[];

  @IsOptional()
  @IsInt()
  idUsuario?: number;

  //Pasos
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdatePasosRecetaDto)
  pasos?: UpdatePasosRecetaDto[];
}
