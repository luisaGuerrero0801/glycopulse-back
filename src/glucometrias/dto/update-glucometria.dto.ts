import { PartialType } from '@nestjs/mapped-types';
import { CreateGlucometriaDto } from './create-glucometria.dto';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateGlucometriaDto extends PartialType(CreateGlucometriaDto) {
  @IsString()
  @IsOptional()
  fechaGlucometria: string;

  @IsString()
  @IsOptional()
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
