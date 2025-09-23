import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoGlucometriaDto } from './create-estado-glucometria.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateEstadoGlucometriaDto extends PartialType(
  CreateEstadoGlucometriaDto
) {
  @IsString()
  @IsOptional()
  nombreEstado?: string;

  @IsString()
  @IsOptional()
  descripcionEstado?: string;
}
