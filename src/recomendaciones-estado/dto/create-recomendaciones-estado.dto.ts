import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateRecomendacionesEstadoDto {
  @IsInt()
  @IsNotEmpty()
  idEstado: number;

  @IsInt()
  @IsNotEmpty()
  idRecomendacion: number;
}
