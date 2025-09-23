import { PartialType } from '@nestjs/mapped-types';
import { CreateRecomendacionesGlucometriaDto } from './create-recomendaciones-glucometria.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRecomendacionesGlucometriaDto extends PartialType(
  CreateRecomendacionesGlucometriaDto
) {
  @IsString()
  @IsOptional()
  tipoRecomendacion?: string;

  @IsString()
  @IsOptional()
  descripcionRecomendacion?: string;
}
