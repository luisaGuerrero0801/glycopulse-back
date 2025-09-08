import { PartialType } from '@nestjs/mapped-types';
import { CreateIngredientesRecetaDto } from './create-ingredientes-receta.dto';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateIngredientesRecetaDto extends PartialType(
  CreateIngredientesRecetaDto
) {
  @IsString()
  @MinLength(1)
  @IsOptional()
  nombreIngrediente?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  cantidadIngredienteReceta?: number;

  @IsString()
  @MinLength(1)
  @IsOptional()
  medidaIngredienteReceta?: string;
}
