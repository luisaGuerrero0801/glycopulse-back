import { IsString, MinLength } from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  @MinLength(1)
  nombreCategoria: string;

  @IsString()
  @MinLength(1)
  descripcionCategoria: string;
}
