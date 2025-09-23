import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEstadoGlucometriaDto {
  @IsString()
  @IsNotEmpty()
  nombreEstado: string;

  @IsString()
  @IsNotEmpty()
  descripcionEstado: string;
}
