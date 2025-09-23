import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateIngredientesRecetaDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  nombreIngrediente: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  cantidadIngredienteReceta: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  medidaIngredienteReceta: string;
}
