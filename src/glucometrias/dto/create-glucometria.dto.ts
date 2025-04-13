import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';

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
  @IsOptional()
  recomendacionGlucometria: string;

  @IsInt()
  @IsOptional()
  idUsuario: number;
}
