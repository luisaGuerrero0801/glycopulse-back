import { CreateRangoGlucometriaDto } from './create-rango-glucometria.dto';
import { MomentoGlucometria } from 'src/glucometrias/enums/momento-glucometria.enum';
declare const UpdateRangoGlucometriaDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateRangoGlucometriaDto>>;
export declare class UpdateRangoGlucometriaDto extends UpdateRangoGlucometriaDto_base {
    nombreRango?: string;
    valorMinRango?: number;
    valorMaxRango?: number;
    idEstado?: number;
    momento?: MomentoGlucometria;
}
export {};
