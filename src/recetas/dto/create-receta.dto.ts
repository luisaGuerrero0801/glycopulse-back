import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateIngredientesRecetaDto } from 'src/ingredientes-receta/dto/create-ingredientes-receta.dto';
import { CreatePasosRecetaDto } from 'src/pasos-recetas/dto/create-pasos-receta.dto';

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

  //Ingredientes
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateIngredientesRecetaDto)
  ingredientes: CreateIngredientesRecetaDto[];

  // Usuario paciente
  @IsNotEmpty()
  @IsInt()
  idUsuario: number;

  //Pasos
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePasosRecetaDto)
  pasos: CreatePasosRecetaDto[];
}
