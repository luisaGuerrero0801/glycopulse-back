import { IsOptional, IsString, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateRolDto } from './create-role.dto';

export class UpdateRolDto extends PartialType(CreateRolDto) {
  @IsString()
  @MinLength(3)
  @IsOptional()
  nombreRol?: string;
}
