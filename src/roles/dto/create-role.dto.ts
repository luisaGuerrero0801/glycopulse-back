import { IsString, MinLength } from 'class-validator';

export class CreateRolDto {
  @IsString()
  @MinLength(3)
  nombreRol: string;
}
