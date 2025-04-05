import { IsNotEmpty, IsString, MinLength, IsInt } from 'class-validator';

export class CreateGlucometriaDto {
  @IsString()
  @IsNotEmpty()
  fechaGlucometria: string;

  @IsString()
  @IsNotEmpty()
  horaGlucometria: string;

  @IsInt()
  nivelGlucometria: number;

  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  recomendacionGlucometria: string;

  @IsInt()
  @IsNotEmpty()
  idUsuario: number;
}
