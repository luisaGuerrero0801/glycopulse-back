import {
  IsNotEmpty,
  IsInt,
  IsEnum,
  IsDateString,
  IsString,
} from 'class-validator';
import { MomentoGlucometria } from '../enums/momento-glucometria.enum';

export class CreateGlucometriaDto {
  @IsDateString()
  @IsNotEmpty()
  fechaGlucometria: Date;

  @IsString()
  @IsNotEmpty()
  horaGlucometria: string;

  @IsInt()
  @IsNotEmpty()
  nivelGlucometria: number;

  @IsInt()
  @IsNotEmpty()
  idUsuario: number;

  @IsEnum(MomentoGlucometria, {
    message: `El momento debe ser uno de: ${Object.values(MomentoGlucometria).join(', ')}`,
  })
  @IsNotEmpty()
  momento: MomentoGlucometria;
}
