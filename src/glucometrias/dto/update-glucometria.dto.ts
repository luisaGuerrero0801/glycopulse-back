import { PartialType } from '@nestjs/mapped-types';
import { CreateGlucometriaDto } from './create-glucometria.dto';

export class UpdateGlucometriaDto extends PartialType(CreateGlucometriaDto) {}
