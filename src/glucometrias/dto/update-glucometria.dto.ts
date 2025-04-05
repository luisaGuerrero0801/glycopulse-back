import { PartialType } from '@nestjs/mapped-types';
import { CreateGlucometriaDto } from './create-glucometria.dto';
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateGlucometriaDto extends PartialType(CreateGlucometriaDto) {
  @IsString()
  @IsOptional()
  fechaGlucometria: string;

  @IsString()
  @IsOptional()
  horaGlucometria: string;

  @IsInt()
  @MinLength(1)
  nivelGlucometria: number;

  @IsString()
  @MinLength(4)
  @IsOptional()
  recomendacionGlucometria: string;

  @IsInt()
  @IsOptional()
  idUsuario: number;
}
