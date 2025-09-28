import { CreateGlucometriaDto } from './create-glucometria.dto';
import { MomentoGlucometria } from '../enums/momento-glucometria.enum';
declare const UpdateGlucometriaDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateGlucometriaDto>>;
export declare class UpdateGlucometriaDto extends UpdateGlucometriaDto_base {
    fechaGlucometria?: Date;
    horaGlucometria?: string;
    nivelGlucometria?: number;
    idUsuario?: number;
    momento?: MomentoGlucometria;
}
export {};
