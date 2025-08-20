import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';

export class CreateGlucometriaDto {
  @IsString()
  @IsNotEmpty()
  fechaGlucometria: string;

  @IsString()
  @IsNotEmpty()
  horaGlucometria: string;

  @IsInt()
  @IsNotEmpty()
  nivelGlucometria: number;

  @IsInt()
  @IsOptional()
  idUsuario: number;
}
