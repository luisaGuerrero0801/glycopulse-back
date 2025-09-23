import { PartialType } from '@nestjs/mapped-types';
import { CreateGlucometriaDto } from './create-glucometria.dto';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsMilitaryTime,
  IsOptional,
} from 'class-validator';
import { MomentoGlucometria } from '../enums/momento-glucometria.enum';

export class UpdateGlucometriaDto extends PartialType(CreateGlucometriaDto) {
  @IsDateString()
  @IsOptional()
  fechaGlucometria?: Date;

  @IsMilitaryTime()
  @IsOptional()
  horaGlucometria?: string;

  @IsInt()
  @IsOptional()
  nivelGlucometria?: number;

  @IsInt()
  @IsOptional()
  idUsuario?: number;

  @IsEnum(MomentoGlucometria, {
    message: `El momento debe ser uno de: ${Object.values(MomentoGlucometria).join(', ')}`,
  })
  @IsOptional()
  momento?: MomentoGlucometria;
}
