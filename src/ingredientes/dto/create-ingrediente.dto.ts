import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateIngredienteDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  nombreIngrediente: string;
}
