import { PartialType } from '@nestjs/mapped-types';
import { CreateRangoGlucometriaDto } from './create-rango-glucometria.dto';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { MomentoGlucometria } from 'src/glucometrias/enums/momento-glucometria.enum';

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

  @IsEnum(MomentoGlucometria)
  @IsOptional()
  momento?: MomentoGlucometria;
}
