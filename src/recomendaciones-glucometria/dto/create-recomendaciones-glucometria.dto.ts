import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRecomendacionesGlucometriaDto {
  @IsString()
  @IsNotEmpty()
  tipoRecomendacion: string;

  @IsString()
  @IsNotEmpty()
  descripcionRecomendacion: string;
}
