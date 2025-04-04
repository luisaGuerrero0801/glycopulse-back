import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateRecetaDto {
  @IsString()
  @MinLength(1)
  nombreReceta: string;

  @IsString()
  @MinLength(1)
  descripcionReceta: string;

  @IsNumber()
  @IsPositive()
  porcionesReceta: number;

  @IsString()
  @MinLength(1)
  tiempoReceta: string;

  @IsString()
  @MinLength(1)
  imagenReceta: string;

  @IsString()
  @MinLength(1)
  nivelReceta: string;

  @IsString()
  @MinLength(1)
  ingredientesReceta: string;

  @IsString()
  @MinLength(1)
  preparacionReceta: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  categoriaReceta: string[];
}
