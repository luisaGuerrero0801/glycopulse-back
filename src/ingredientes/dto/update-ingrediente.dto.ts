import { PartialType } from '@nestjs/mapped-types';
import { CreateIngredienteDto } from './create-ingrediente.dto';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateIngredienteDto extends PartialType(CreateIngredienteDto) {
  @IsString()
  @MinLength(1)
  @IsOptional()
  nombreIngrediente?: string;
}
