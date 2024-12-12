import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateRecetaDto {
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

  @IsString()
  @MinLength(1)
  @IsOptional()
  tiempoReceta?: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  nivelReceta?: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  ingredientesReceta?: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  preparacionReceta?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  @IsString({ each: true })
  categoriaReceta?: string[];
}
