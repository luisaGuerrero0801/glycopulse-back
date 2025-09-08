import { PartialType } from '@nestjs/mapped-types';
import { CreatePasosRecetaDto } from './create-pasos-receta.dto';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdatePasosRecetaDto extends PartialType(CreatePasosRecetaDto) {
  @IsNumber()
  @IsOptional()
  @IsPositive()
  ordenPasoReceta?: number;

  @IsString()
  @IsOptional()
  @MinLength(1)
  descripcionPasoReceta?: string;
}
