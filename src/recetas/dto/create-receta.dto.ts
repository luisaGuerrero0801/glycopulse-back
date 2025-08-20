import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateRecetaDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  nombreReceta: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  descripcionReceta: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  porcionesReceta: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  caloriasReceta: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  tiempoReceta: string;

  @IsString()
  @IsNotEmpty()
  imagenReceta: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  nivelReceta: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  categoriaReceta: string;

  @IsNotEmpty()
  @IsInt()
  idUsuario: number;
}
