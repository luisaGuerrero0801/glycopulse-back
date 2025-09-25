import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { MomentoGlucometria } from 'src/glucometrias/enums/momento-glucometria.enum';

export class CreateRangoGlucometriaDto {
  @IsString()
  @IsNotEmpty()
  nombreRango: string;

  @IsInt()
  @IsNotEmpty()
  valorMinRango: number;

  @IsInt()
  @IsNotEmpty()
  valorMaxRango: number;

  @IsInt()
  @IsNotEmpty()
  idEstado: number;

  @IsEnum(MomentoGlucometria)
  @IsNotEmpty()
  momento: MomentoGlucometria;
}
