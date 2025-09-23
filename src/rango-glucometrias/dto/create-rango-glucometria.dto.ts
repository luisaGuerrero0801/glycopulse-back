import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateRangoGlucometriaDto {
  @IsString()
  @IsNotEmpty()
  nombreRango: string;

  @IsInt()
  @IsNotEmpty()
  valorMinRango: number;

  @IsInt()
  @IsNotEmpty()
  valorMaxRango: number;

  @IsInt()
  @IsNotEmpty()
  idEstado: number;
}
