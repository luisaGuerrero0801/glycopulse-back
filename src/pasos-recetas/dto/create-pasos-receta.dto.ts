import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreatePasosRecetaDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  ordenPasoReceta: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  descripcionPasoReceta: string;
}
