import { CreateEstadoGlucometriaDto } from './create-estado-glucometria.dto';
declare const UpdateEstadoGlucometriaDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateEstadoGlucometriaDto>>;
export declare class UpdateEstadoGlucometriaDto extends UpdateEstadoGlucometriaDto_base {
    nombreEstado?: string;
    descripcionEstado?: string;
}
export {};
