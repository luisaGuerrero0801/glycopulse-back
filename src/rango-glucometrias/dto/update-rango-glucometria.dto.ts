import { PartialType } from '@nestjs/mapped-types';
import { CreateRangoGlucometriaDto } from './create-rango-glucometria.dto';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateRangoGlucometriaDto extends PartialType(
  CreateRangoGlucometriaDto
) {
  @IsString()
  @IsOptional()
  nombreRango?: string;

  @IsInt()
  @IsOptional()
  valorMinRango?: number;

  @IsInt()
  @IsOptional()
  valorMaxRango?: number;

  @IsInt()
  @IsOptional()
  idEstado?: number;
}
