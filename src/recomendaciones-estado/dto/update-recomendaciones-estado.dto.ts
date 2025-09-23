import { PartialType } from '@nestjs/mapped-types';
import { CreateRecomendacionesEstadoDto } from './create-recomendaciones-estado.dto';

export class UpdateRecomendacionesEstadoDto extends PartialType(
  CreateRecomendacionesEstadoDto
) {}
